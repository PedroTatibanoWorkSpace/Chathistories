import { MessageProduct } from '../../entity/message-product.entity';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { MessageProductQuery } from '../outbounds/message-product.repository.port';

export interface PaginateMessageProductsPort {
  execute(
    input: MessageProductQuery,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<MessageProduct>>;
}
