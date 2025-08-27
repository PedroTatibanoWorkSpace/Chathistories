import { Injectable, Logger, Inject } from '@nestjs/common';
import { CatalogLiveMessagesPort } from '../../domain/ports/inbounds/catalog-live-messages.port';
import type {
  ChatGuruRequestPort,
  MessageData,
} from '../../domain/ports/outbounds/chatguru-request.port';
import { ChatService } from '../services/chat.service';
import { MessageService } from '../services/message.service';
import type { MessageRepositoryPort } from 'src/modules/messages/domain/ports/outbounds/message.repository.port';
import { In } from 'typeorm';
import { HelpersService } from '../services/helpers.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CatalogLiveMessagesUseCase implements CatalogLiveMessagesPort {
  private readonly logger = new Logger(CatalogLiveMessagesUseCase.name);

  private readonly bootTimestamp = Date.now();

  private lastGlobalPollTimestamp = this.bootTimestamp;
  private isRunning = false;
  private cronEnabled = false;

  constructor(
    @Inject('ChatGuruRequestPort')
    private readonly chatGuruService: ChatGuruRequestPort,
    private readonly chatService: ChatService,
    private readonly helpersService: HelpersService,
    private readonly messageService: MessageService,
    @Inject('MessageRepositoryPort')
    private readonly messageRepository: MessageRepositoryPort,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async execute() {
    if (!this.cronEnabled) {
      return;
    }

    if (this.isRunning) {
      return;
    }
    this.isRunning = true;

    this.logger.log('Iniciando execução do polling de mensagens...');
    try {
      const maxPagesPerRun = 8;
      let page = 0;
      let pagesFetched = 0;
      let shouldContinuePages = true;

      let runMaxChatTs = this.lastGlobalPollTimestamp;

      while (shouldContinuePages && pagesFetched < maxPagesPerRun) {
        this.logger.log(`🔄 Buscando página de chats: page=${page}`);
        const chatListResponse = await this.chatGuruService.getChatList(page, {
          filter_order_by: '-date_last_message',
        });

        if (!chatListResponse?.chats?.length) {
          this.logger.log(`❌ Nenhum chat retornado na página ${page}.`);
          break;
        }

        for (const chat of chatListResponse.chats) {
          this.logger.log(`➡️ Processando chat: ${chat.id}`);
          const chatLastStr =
            (chat as any).last_message?.date ?? (chat as any).updated ?? null;
          const chatLastTs = chatLastStr ? new Date(chatLastStr).getTime() : 0;

          if (chatLastTs <= this.bootTimestamp) {
            this.logger.log(
              `⏹️ Chat ${chat.id} é mais antigo que bootTimestamp, interrompendo paginação de chats.`,
            );
            shouldContinuePages = false;
            break;
          }

          if (chatLastTs > runMaxChatTs) runMaxChatTs = chatLastTs;

          await this.chatService.ensureChatExists(chat);

          const lastSavedTs = await this.getLastSavedTimestamp(chat.id);
          this.logger.log(
            `Último timestamp salvo para chat ${chat.id}: ${lastSavedTs}`,
          );

          if (lastSavedTs && chatLastTs <= lastSavedTs) {
            this.logger.log(`Chat ${chat.id} já está atualizado, pulando.`);
            continue;
          }

          let msgPage = 1;
          const processedIds = new Set<string>();
          const batchSize = 300;
          let buffer: any[] = [];
          let lastPageIds: string[] = [];

          while (true) {
            this.logger.log(
              `🔄 Buscando página ${msgPage} de mensagens do chat ${chat.id}`,
            );
            const msgsResp = await this.chatGuruService.getMessages(
              chat.id,
              msgPage,
            );
            const messagesData: MessageData[] = (
              msgsResp?.messages_and_notes || []
            )
              .filter((w) => w?.m?._id)
              .map((w) => w.m);

            this.logger.log(
              `Página ${msgPage} retornou ${messagesData.length} mensagens para chat ${chat.id}`,
            );

            if (!messagesData.length) {
              this.logger.log(
                `Fim das mensagens para chat ${chat.id} na página ${msgPage}.`,
              );
              break;
            }

            const currentPageIds = messagesData.map((m) => m._id.$oid);

            if (
              lastPageIds.length > 0 &&
              currentPageIds.every((id) => lastPageIds.includes(id))
            ) {
              this.logger.warn(
                `⚠️ Página ${msgPage} de mensagens do chat ${chat.id} não trouxe novas mensagens, interrompendo paginação.`,
              );
              break;
            }
            lastPageIds = currentPageIds;

            const fresh = lastSavedTs
              ? messagesData.filter(
                  (m) =>
                    this.helpersService.normalizeMessageTs(m) > lastSavedTs,
                )
              : messagesData.filter(
                  (m) =>
                    this.helpersService.normalizeMessageTs(m) >
                    this.bootTimestamp,
                );

            if (!fresh.length) {
              break;
            }

            const extIds = fresh.map((m) => m._id.$oid);
            const existing = await this.messageRepository.find({
              externalId: In(extIds),
            });
            const existingSet = new Set(existing.map((e) => e.externalId));

            for (const m of fresh) {
              const ext = m._id.$oid;
              if (processedIds.has(ext) || existingSet.has(ext)) continue;

              const entity = await this.messageService.buildMessageEntity(m);
              buffer.push(entity);
              processedIds.add(ext);

              if (buffer.length >= batchSize) {
                (await (
                  this.messageRepository as any
                ).createManyIgnoreConflicts?.(buffer.splice(0, batchSize))) ??
                  this.messageRepository.createMany(
                    buffer.splice(0, batchSize) as any,
                  );
              }
            }

            if (buffer.length > 0) {
              (await (
                this.messageRepository as any
              ).createManyIgnoreConflicts?.(buffer)) ??
                this.messageRepository.createMany(buffer as any);
              buffer = [];
            }

            msgPage++;
          }
        }

        page++;
        pagesFetched++;
      }

      this.lastGlobalPollTimestamp = Math.max(
        this.lastGlobalPollTimestamp,
        runMaxChatTs,
      );
    } catch (error) {
      this.logger.error('Erro no polling:', error.stack ?? error.message);
    } finally {
      this.logger.log('Finalizando execução do polling de mensagens.');
      this.isRunning = false;
    }
  }

  private async getLastSavedTimestamp(chatExternalId: string): Promise<number> {
    if ((this.messageRepository as any).findLastMessageTimestamp) {
      const ts = await (this.messageRepository as any).findLastMessageTimestamp(
        chatExternalId,
      );
      if (ts) return ts;
    }
    return this.bootTimestamp;
  }

  public enableCron() {
    this.cronEnabled = true;
    this.logger.log('Polling habilitado via endpoint.');
  }

  public disableCron() {
    this.cronEnabled = false;
    this.logger.log('Polling desabilitado via endpoint.');
  }

  public isCronActive() {
    return this.cronEnabled;
  }
}
