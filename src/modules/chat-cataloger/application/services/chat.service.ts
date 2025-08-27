import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import type { CreateChatPort } from '../../../chats/domain/ports/inbounds/create-chat.port';
import type { FindChatByExternalIdPort } from '../../../chats/domain/ports/inbounds/find-chat-by-external-id.port';
import { PhoneService } from './phone.service';
import { AccountService } from './account.service';
import { HelpersService } from './helpers.service';
import { ChatData } from '../../domain/ports/outbounds/chatguru-request.port';
import type { PaginateChatsPort } from 'src/modules/chats/domain/ports/inbounds/paginate-chats.port';
import { ChatDelegationsService } from './chat-delegations.service';
import { ChatFunnelStepsService } from './chat-funnel-steps.service';
import { ChatTagsService } from './chat-tags.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @Inject('CreateChatPort')
    private readonly createChatPort: CreateChatPort,
    @Inject('FindChatByExternalIdPort')
    private readonly findChatByExternalIdPort: FindChatByExternalIdPort,
    private readonly phoneService: PhoneService,
    private readonly accountService: AccountService,
    private helpersService: HelpersService,
    @Inject('PaginateChatsPort')
    private readonly paginateChatsPort: PaginateChatsPort,
    @Inject(forwardRef(() => ChatDelegationsService))
    private readonly chatDelegationsService: ChatDelegationsService,
    @Inject(forwardRef(() => ChatFunnelStepsService))
    private readonly chatFunnelStepsService: ChatFunnelStepsService,
    private readonly chatTagsService: ChatTagsService,
  ) {}

  async ensureChatExists(chatData: ChatData): Promise<string> {
    const existingChat = await this.findChatByExternalIdPort.execute(
      chatData.id,
    );

    if (!existingChat) {
      const accountId = await this.accountService.ensureAccountExists(
        chatData.account_id,
      );
      const phoneId = await this.phoneService.ensurePhoneExists(
        chatData.phone_id,
        chatData.account_id,
      );

      const createdAt = this.helpersService.parseDate(chatData.created);
      const updatedAt = this.helpersService.parseDate(chatData.updated);
      const createdChat = await this.createChatPort.execute({
        externalId: chatData.id,
        phoneId: phoneId,
        accountId: accountId,
        waChatId: chatData.wa_chat_id,
        name: chatData.name,
        kind: chatData.kind,
        picture: chatData.picture,
        status: this.mapChatStatus(chatData.status),
        favorite: chatData.favorite,
        archived: chatData.archived,
        scheduled: chatData.scheduled,
        newMessages: chatData.new_messages,
        createdAt: createdAt,
        updatedAt: updatedAt,
      });

      this.logger.debug(`✅ Chat criado: ${chatData.id}`);
      return createdChat.id;
    }

    return existingChat.id;
  }

  private mapChatStatus(status: string): number {
    const statusMap: { [key: string]: number } = {
      ABERTO: 1,
      'EM ATENDIMENTO': 2,
      FECHADO: 3,
      PAUSADO: 4,
    };
    return statusMap[status] || 0;
  }

  async getAllChatIds(): Promise<string[]> {
    const allChats: string[] = [];
    let page = 1;
    const limit = 1000;
    let hasMore = true;

    while (hasMore) {
      try {
        const result = await this.paginateChatsPort.execute(
          {},
          { page, limit },
        );

        for (const chat of result.items) {
          allChats.push(chat.externalId);
        }

        hasMore = result.items.length === limit;
        page++;
      } catch (error) {
        this.logger.error(
          `Erro ao buscar chats página ${page}:`,
          error.message,
        );
        hasMore = false;
      }
    }

    this.logger.log(
      `📋 Total de ${allChats.length} chats encontrados para processar mensagens`,
    );
    return allChats;
  }

  async processChatData(chatData: ChatData): Promise<void> {
    try {
      this.logger.debug(`📥 Processando chat: ${JSON.stringify(chatData.id)}`);
      await this.accountService.ensureAccountExists(chatData.account_id);
      await this.phoneService.ensurePhoneExists(
        chatData.phone_id,
        chatData.account_id,
      );
      await this.ensureChatExists(chatData);
      await this.chatDelegationsService.processChatDelegations(chatData);
      await this.chatFunnelStepsService.processChatFunnelSteps(chatData);
      await this.chatTagsService.processChatTags(chatData);
    } catch (error) {
      throw error;
    }
  }
}
