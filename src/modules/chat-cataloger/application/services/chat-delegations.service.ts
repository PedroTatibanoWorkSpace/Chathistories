import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ChatData } from '../../domain/ports/outbounds/chatguru-request.port';
import { UserService } from './user.service';
import type { CreateChatDelegationPort } from 'src/modules/chat-delegation/domain/ports/inbounds/create-chat-delegation.port';
import { ChatService } from './chat.service';

@Injectable()
export class ChatDelegationsService {
  constructor(
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
    private readonly userService: UserService,
    @Inject('CreateChatDelegationPort')
    private readonly createChatDelegationPort: CreateChatDelegationPort,
  ) {}

  async processChatDelegations(chatData: ChatData): Promise<void> {
    const chatId = await this.chatService.ensureChatExists(chatData);

    for (const userExternalId of chatData.users_delegated_ids) {
      const userId = await this.userService.ensureUserExists(
        userExternalId,
        chatData.account_id,
      );

      await this.createChatDelegationPort.execute({
        chatId: chatId,
        userId: userId,
        delegationType: 'user',
      });
    }
  }
}
