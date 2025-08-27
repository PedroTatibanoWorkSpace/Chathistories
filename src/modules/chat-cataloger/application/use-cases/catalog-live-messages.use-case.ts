import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  CatalogLiveMessagesPort,
  CatalogLiveMessagesStats,
  CatalogLiveMessagesOptions,
} from '../../domain/ports/inbounds/catalog-live-messages.port';
import type {
  ChatGuruRequestPort,
  MessageData,
} from '../../domain/ports/outbounds/chatguru-request.port';
import { ChatService } from '../services/chat.service';
import { MessageService } from '../services/message.service';
import type { MessageRepositoryPort } from 'src/modules/messages/domain/ports/outbounds/message.repository.port';
import { In } from 'typeorm';

@Injectable()
export class CatalogLiveMessagesUseCase implements CatalogLiveMessagesPort {
  private readonly logger = new Logger(CatalogLiveMessagesUseCase.name);

  constructor(
    @Inject('ChatGuruRequestPort')
    private readonly chatGuruService: ChatGuruRequestPort,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    @Inject('MessageRepositoryPort')
    private readonly messageRepository: MessageRepositoryPort,
  ) {}

  async pollNewChatsAndMessages() {
    try {

      const chatListResponse = await this.chatGuruService.getChatList(0, {
        filter_new_messages: true,
      });

      for (const chat of chatListResponse.chats) {
        await this.chatService.ensureChatExists(chat);

        const lastSavedMessage = await this.messageRepository.find({
          chatExternalId: chat.id,
        });
        let lastTimestamp: number | null = null;
        if (lastSavedMessage.length > 0) {
          lastTimestamp = Math.max(
            ...lastSavedMessage.map((m) => m.timestamp.getTime()),
          );
        }

        const messagesResponse = await this.chatGuruService.getMessages(
          chat.id,
          1,
        );

        const messagesData: MessageData[] =
          messagesResponse.messages_and_notes
            .filter(wrapper => wrapper.m && wrapper.m._id)
            .map(wrapper => wrapper.m);

        const newMessages = lastTimestamp
          ? messagesData.filter(
              (m) => new Date(m.timestamp.$date).getTime() > lastTimestamp,
            )
          : messagesData;

        const existingMessages = await this.messageRepository.find({
          externalId: In(newMessages.map((m) => m._id.$oid)),
        });
        const existingSet = new Set(existingMessages.map((e) => e.externalId));

        for (const messageData of newMessages) {
          const externalId = messageData._id.$oid;
          if (existingSet.has(externalId)) continue;
          const message =
            await this.messageService.buildMessageEntity(messageData);
          await this.messageRepository.create(message);
        }
      }
      this.logger.debug('Polling de chats/mensagens concluído.');
    } catch (error) {
      this.logger.error('Erro no polling:', error.message);
    }
  }

  async execute(
    options: CatalogLiveMessagesOptions = {},
  ): Promise<CatalogLiveMessagesStats> {
    const { filters = {} } = options;

    const stats: CatalogLiveMessagesStats = {
      totalChatsProcessed: 0,
      totalMessagesProcessed: 0,
      startTime: new Date(),
      endTime: new Date(),
      durationMs: 0,
      errors: [],
    };

    this.logger.log('🚀 Iniciando catalogação rápida de mensagens (live)...');

    try {
      const chatListResponse = await this.chatGuruService.getChatList(0, {
        ...filters,
        filter_new_messages: true,
      });
      for (const chat of chatListResponse.chats) {
        try {
          await this.chatService.ensureChatExists(chat);
          stats.totalChatsProcessed++;

          const lastSavedMessage = await this.messageRepository.find({
            chatExternalId: chat.id,
          });
          let lastTimestamp: number | null = null;
          if (lastSavedMessage.length > 0) {
            lastTimestamp = Math.max(
              ...lastSavedMessage.map((m) => m.timestamp.getTime()),
            );
          }

          const messagesResponse = await this.chatGuruService.getMessages(
            chat.id,
            1,
          );

          const messagesData: MessageData[] =
            messagesResponse.messages_and_notes
              .filter(wrapper => wrapper.m && wrapper.m._id)
              .map(wrapper => wrapper.m);

          const newMessages = lastTimestamp
            ? messagesData.filter(
                (m) => new Date(m.timestamp.$date).getTime() > lastTimestamp,
              )
            : messagesData;

          const existingMessages = await this.messageRepository.find({
            externalId: In(newMessages.map((m) => m._id.$oid)),
          });
          const existingSet = new Set(
            existingMessages.map((e) => e.externalId),
          );

          for (const messageData of newMessages) {
            const externalId = messageData._id.$oid;
            if (existingSet.has(externalId)) continue;
            const message =
              await this.messageService.buildMessageEntity(messageData);
            await this.messageRepository.create(message);
            stats.totalMessagesProcessed++;
          }
        } catch (error) {
          stats.errors.push({
            chatId: chat.id,
            error: `Erro ao processar chat/mensagens: ${error.message}`,
            timestamp: new Date(),
          });
        }
      }
      stats.endTime = new Date();
      stats.durationMs = stats.endTime.getTime() - stats.startTime.getTime();
    } catch (error) {
      stats.errors.push({
        error: `Erro crítico no polling: ${error.message}`,
        timestamp: new Date(),
      });
    }
    return stats;
  }
}
