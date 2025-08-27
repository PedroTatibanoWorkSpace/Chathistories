import { Injectable, Logger, Inject } from '@nestjs/common';
import { MessageData } from '../../domain/ports/outbounds/chatguru-request.port';
import { Message } from 'src/modules/messages/domain/entity/message.entity';
import { HelpersService } from './helpers.service';
import { ChatService } from './chat.service';
import { PhoneService } from './phone.service';
import { AccountService } from './account.service';
import { UserService } from './user.service';
import type { MessageRepositoryPort } from 'src/modules/messages/domain/ports/outbounds/message.repository.port';
import { ChatData } from '../../domain/ports/outbounds/chatguru-request.port';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    @Inject('MessageRepositoryPort')
    private readonly messageRepository: MessageRepositoryPort,
    private readonly helpersService: HelpersService,
    private readonly chatService: ChatService,
    private readonly phoneService: PhoneService,
    private readonly accountService: AccountService,
    private readonly userService: UserService,
  ) {}

  async buildMessageEntity(messageData: MessageData): Promise<Message> {
    const chatId = await this.chatService.ensureChatExists({
      id: messageData.chat.$oid,
    } as ChatData);
    const phoneId = await this.phoneService.ensurePhoneExists(
      messageData.phone.$oid,
      messageData.account_id.$oid,
    );
    const accountId = await this.accountService.ensureAccountExists(
      messageData.account_id.$oid,
    );

    let authorId: string | undefined;
    if (messageData.author) {
      authorId = await this.userService.ensureUserExists(
        messageData.author.$oid,
        messageData.account_id.$oid,
      );
    }

    const edits =
      messageData.edits?.map((edit) => ({
        oldText: edit.old_text,
        editDate: this.helpersService.parseDate(edit.date.$date),
        messageTimestamp: this.helpersService.parseDate(
          messageData.timestamp.$date,
        ),
      })) || undefined;

    return Message.create({
      chatId,
      phoneId,
      accountId,
      authorId,
      externalId: messageData._id.$oid,
      chatExternalId: messageData.chat.$oid,
      phoneExternalId: messageData.phone.$oid,
      accountExternalId: messageData.account_id.$oid,
      authorExternalId: messageData.author?.$oid,
      waMessageId: messageData.wa_message_id,
      waSenderId: messageData.wa_sender_id,
      status: Message.mapMessageStatus(messageData.status),
      isApproved: messageData.is_approved,
      type: Message.mapMessageType(messageData.type),
      isOut: messageData.is_out,
      ack: messageData.ack,
      text: messageData.text,
      quotes: messageData.quotes,
      quotesType: Message.mapQuotesType(messageData.quotes_type),
      quotesWaMessageId: messageData.quotes_wa_message_id,
      optionsOpen: messageData.options_open,
      isTemplate: messageData.is_template,
      deleted: messageData.deleted,
      hide: messageData.hide,
      processor: messageData.processor,
      senderName: messageData.sender_name,
      metadata: messageData.metadata,
      errorDetails: messageData.error_details,
      isForwarded: messageData.is_forwarded,
      fromDevice: messageData.from_device,
      createdAt: this.helpersService.parseDate(messageData.created.$date),
      timestamp: this.helpersService.parseDate(messageData.timestamp.$date),
      sendDate: messageData.send_date
        ? this.helpersService.parseDate(messageData.send_date.$date)
        : undefined,
      products: messageData.products,
      edits,
    });
  }

  async ensureMessageExists(messageData: MessageData): Promise<string> {
    const existingMessage = await this.messageRepository.findMessageByExternalId(
      messageData._id.$oid,
    );

    if (!existingMessage) {
      const message = await this.buildMessageEntity(messageData);
      const createdMessage = await this.messageRepository.create(message);
      return createdMessage.id;
    }

    return existingMessage.id;
  }
}
