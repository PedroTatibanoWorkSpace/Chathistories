import { ChatDelegation } from 'src/modules/chat-delegation/domain/entity/chat-delegation.entity';
import { ChatDelegationOrmEntity } from '../orm/chat-delegation-orm.entity';

export class ChatDelegationMapper {
  static toOrmEntity(domainChatDelegation: ChatDelegation): ChatDelegationOrmEntity {
    return {
      id: domainChatDelegation.id,
      chatId: domainChatDelegation.chatId,
      userId: domainChatDelegation.userId,
      groupExternalId: domainChatDelegation.groupExternalId,
      delegationType: domainChatDelegation.delegationType,
      createdAt: domainChatDelegation.createdAt,
    };
  }

  static toDomainEntity(ormChatDelegation: ChatDelegationOrmEntity): ChatDelegation {
    return ChatDelegation.reconstruct({
      id: ormChatDelegation.id,
      chatId: ormChatDelegation.chatId,
      userId: ormChatDelegation.userId,
      groupExternalId: ormChatDelegation.groupExternalId,
      delegationType: ormChatDelegation.delegationType,
      createdAt: ormChatDelegation.createdAt,
    });
  }
}
