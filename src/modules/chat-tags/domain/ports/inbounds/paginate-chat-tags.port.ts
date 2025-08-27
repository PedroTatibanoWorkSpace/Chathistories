import { ChatTag } from '../../entity/chat-tag.entity';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { ChatTagQuery } from '../outbounds/chat-tag.repository.port';

export interface PaginateChatTagsPort {
  execute(
    input: ChatTagQuery,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<ChatTag>>;
}
