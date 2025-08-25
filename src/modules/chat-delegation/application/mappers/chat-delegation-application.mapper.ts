import { ChatDelegation } from '../../domain/entity/chat-delegation.entity';
import { ChatDelegationOutput } from '../dtos/chat-delegation.output';

export class ChatDelegationMapper {
  static toOutputDto(chatDelegation: ChatDelegation): ChatDelegationOutput {
    return {
      id: chatDelegation.id,
      chatId: chatDelegation.chatId,
      userId: chatDelegation.userId,
      groupExternalId: chatDelegation.groupExternalId,
      delegationType: chatDelegation.delegationType,
      createdAt: chatDelegation.createdAt,
    };
  }
}
