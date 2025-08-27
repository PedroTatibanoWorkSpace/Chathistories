import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ChatData } from '../../domain/ports/outbounds/chatguru-request.port';
import { ChatService } from './chat.service';
import type { CreateChatTagPort } from 'src/modules/chat-tags/domain/ports/inbounds/create-chat-tag.port';

@Injectable()
export class ChatTagsService {
  constructor(
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
    @Inject('CreateChatTagPort')
    private readonly createChatTagPort: CreateChatTagPort,
  ) {}
  async processChatTags(chatData: ChatData): Promise<void> {
    const chatId = await this.chatService.ensureChatExists(chatData);

    for (const tag of chatData.tags) {
      await this.createChatTagPort.execute({
        chatId: chatId,
        text: tag.text,
        color: tag.color,
        bgColor: tag.bg,
      });
    }
  }
}
