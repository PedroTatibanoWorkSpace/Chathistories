import { BaseRepositoryPort } from 'src/common/domain/ports/base-repository.port';
import { ChatDelegation } from '../../entity/chat-delegation.entity';

export type ChatDelegationQuery = {
  chatId?: string;
  userId?: string;
  groupExternalId?: string;
  delegationType?: string;
};

export interface ChatDelegationRepositoryPort
  extends BaseRepositoryPort<ChatDelegation, ChatDelegationQuery> {
  findChatDelegationByChatId(chatId: string): Promise<ChatDelegation | null>;
}
