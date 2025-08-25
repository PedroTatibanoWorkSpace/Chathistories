import { MessageEdit } from '../../entity/message-edit.entity';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { MessageEditQuery } from '../outbounds/message-edit.repository.port';

export interface PaginateMessageEditsPort {
  execute(
    input: MessageEditQuery,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<MessageEdit>>;
}
