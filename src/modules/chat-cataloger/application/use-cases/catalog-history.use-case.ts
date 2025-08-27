import { Injectable, Logger, Inject } from '@nestjs/common';
import {
  CatalogHistoryPort,
  CatalogHistoryStats,
  CatalogHistoryOptions,
} from '../../domain/ports/inbounds/catalog-history.port';
import type {
  ChatGuruRequestPort,
} from '../../domain/ports/outbounds/chatguru-request.port';
import { MessageService } from '../services/message.service';
import { HelpersService } from '../services/helpers.service';
import { ChatService } from '../services/chat.service';
import type { MessageRepositoryPort } from 'src/modules/messages/domain/ports/outbounds/message.repository.port';
import { In } from 'typeorm';

@Injectable()
export class CatalogHistoryUseCase implements CatalogHistoryPort {
  private readonly logger = new Logger(CatalogHistoryUseCase.name);

  constructor(
    @Inject('ChatGuruRequestPort')
    private readonly chatGuruService: ChatGuruRequestPort,
    private readonly messageService: MessageService,
    private readonly helpersService: HelpersService,
    private readonly chatService: ChatService,
    @Inject('MessageRepositoryPort')
    private readonly messageRepository: MessageRepositoryPort,
  ) {}

  async execute(
    options: CatalogHistoryOptions = {},
  ): Promise<CatalogHistoryStats> {
    const {
      maxConcurrentChats = 15,
      maxConcurrentMessages = 15,
      batchSize = 100,
      delayBetweenRequests = 0,
      retryAttempts = 3,
      resumeFromChatId,
    } = options;

    const stats: CatalogHistoryStats = {
      totalChatsProcessed: 0,
      totalMessagesProcessed: 0,
      startTime: new Date(),
      endTime: new Date(),
      durationMs: 0,
      errors: [],
    };

    this.logger.log(
      '🚀 Iniciando catalogação do histórico completo de chats...',
    );

    try {
      await this.catalogAllChats(stats, {
        batchSize,
        delayBetweenRequests,
        retryAttempts,
        resumeFromChatId,
      });

      await this.catalogAllMessages(stats, {
        maxConcurrentChats,
        maxConcurrentMessages,
        delayBetweenRequests,
        retryAttempts,
      });

      stats.endTime = new Date();
      stats.durationMs = stats.endTime.getTime() - stats.startTime.getTime();

      this.logger.log('✅ Catalogação concluída com sucesso!');
      this.helpersService.logFinalStats(stats);

      return stats;
    } catch (error) {
      stats.endTime = new Date();
      stats.durationMs = stats.endTime.getTime() - stats.startTime.getTime();
      stats.errors.push({
        error: `Erro crítico na catalogação: ${error.message}`,
        timestamp: new Date(),
      });

      this.logger.error('❌ Erro crítico durante a catalogação:', error.stack);
      throw error;
    }
  }

  private async catalogAllChats(
    stats: CatalogHistoryStats,
    options: {
      batchSize: number;
      delayBetweenRequests: number;
      retryAttempts: number;
      resumeFromChatId?: string;
    },
  ): Promise<void> {
    this.logger.log('📋 Fase 1: Catalogando todos os chats...');

    let pageNum = 0;
    let hasMoreChats = true;
    let shouldSkip = !!options.resumeFromChatId;

    while (hasMoreChats) {
      try {
        await this.helpersService.delay(options.delayBetweenRequests);

        const chatListResponse = await this.helpersService.withRetry(
          () => this.chatGuruService.getChatList(pageNum),
          options.retryAttempts,
        );

        if (chatListResponse.chats.length === 0) {
          hasMoreChats = false;
          break;
        }

        for (
          let i = 0;
          i < chatListResponse.chats.length;
          i += options.batchSize
        ) {
          const batch = chatListResponse.chats.slice(i, i + options.batchSize);

          for (const chat of batch) {
            if (shouldSkip) {
              if (chat.id === options.resumeFromChatId) {
                shouldSkip = false;
              }
              continue;
            }

            try {
              await this.chatService.processChatData(chat);
              stats.totalChatsProcessed++;

              if (stats.totalChatsProcessed % 100 === 0) {
                this.logger.log(
                  `📊 Processados ${stats.totalChatsProcessed} chats...`,
                );
              }
            } catch (error) {
              stats.errors.push({
                chatId: chat.id,
                error: `Erro ao processar chat: ${error.message}`,
                timestamp: new Date(),
              });
              this.logger.warn(
                `⚠️ Erro ao processar chat ${chat.id}: ${error.message}`,
              );
            }
          }
        }

        hasMoreChats =
          chatListResponse.total_returned === chatListResponse.chats.length &&
          chatListResponse.total_chats >
            (pageNum + 1) * chatListResponse.chats.length;
        pageNum++;
      } catch (error) {
        stats.errors.push({
          error: `Erro ao buscar página ${pageNum} de chats: ${error.message}`,
          timestamp: new Date(),
        });
        hasMoreChats = false;
      }
    }
  }

  private async catalogAllMessages(
    stats: CatalogHistoryStats,
    options: {
      maxConcurrentChats: number;
      maxConcurrentMessages: number;
      delayBetweenRequests: number;
      retryAttempts: number;
    },
  ): Promise<void> {
    this.logger.log('Fase 2: Catalogando mensagens de todos os chats...');

    const allChatIds = await this.chatService.getAllChatIds();

    if (allChatIds.length === 0) {
      this.logger.warn(
        '⚠️ Nenhum chat encontrado no banco para catalogar mensagens',
      );
      return;
    }

    const chatBatches = this.helpersService.createBatches(
      allChatIds,
      options.maxConcurrentChats,
    );

    const messagesToInsert: any[] = [];
    const batchSize = 100;

    for (const chatBatch of chatBatches) {
      const promises = chatBatch.map(async (chatId) => {
        try {
          await this.helpersService.delay(options.delayBetweenRequests);

          const messagesResponse = await this.helpersService.withRetry(
            () => this.chatGuruService.getMessages(chatId, 30),
            options.retryAttempts,
          );

          const messagesData = messagesResponse.messages_and_notes.map(
            (wrapper) => wrapper.m,
          );

          const existingMessages = await this.messageRepository.find({
            externalId: In(messagesData.map((m) => m._id.$oid)),
          });
          const existingSet = new Set(
            existingMessages.map((e) => e.externalId),
          );
          for (const messageData of messagesData) {
            const externalId = messageData._id.$oid;
            if (existingSet.has(externalId)) {
              continue;
            }

            const message =
              await this.messageService.buildMessageEntity(messageData);
            messagesToInsert.push(message);

            if (messagesToInsert.length === batchSize) {
              await this.messageRepository.createMany(
                messagesToInsert.splice(0, batchSize),
              );
            }
          }
          stats.totalMessagesProcessed += messagesData.length;
        } catch (error) {
          stats.errors.push({
            chatId,
            error: `Erro ao processar mensagens: ${error.message}`,
            timestamp: new Date(),
          });
        }
      });

      await Promise.allSettled(promises);
      await this.helpersService.delay(options.delayBetweenRequests);
    }

    if (messagesToInsert.length > 0) {
      await this.messageRepository.createMany(messagesToInsert);
    }
  }
}
