import { Message } from '../../entity/message.entity';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { MessageQuery } from '../outbounds/message.repository.port';

export interface PaginateMessagesPort {
  execute(
    input: MessageQuery,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<Message>>;
}
