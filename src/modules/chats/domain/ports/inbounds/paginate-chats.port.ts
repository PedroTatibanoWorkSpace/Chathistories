import { Chat } from '../../entity/chat.entity';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { ChatQuery } from '../outbounds/chat.repository.port';

export interface PaginateChatsPort {
  execute(
    input: ChatQuery,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<Chat>>;
}
