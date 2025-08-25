import { BaseRepositoryPort } from 'src/common/domain/ports/base-repository.port';
import { MessageProduct } from '../../entity/message-product.entity';

export type MessageProductQuery = {
  messageId?: string;
};

export interface MessageProductRepositoryPort
  extends BaseRepositoryPort<MessageProduct, MessageProductQuery> {
  findMessageProductByMessageId(messageId: string): Promise<MessageProduct | null>;
}
