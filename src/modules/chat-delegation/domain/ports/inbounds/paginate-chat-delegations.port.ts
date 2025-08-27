import { ChatDelegation } from '../../entity/chat-delegation.entity';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { ChatDelegationQuery } from '../outbounds/chat-delegation.repository.port';

export interface PaginateChatDelegationsPort {
  execute(
    input: ChatDelegationQuery,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<ChatDelegation>>;
}
