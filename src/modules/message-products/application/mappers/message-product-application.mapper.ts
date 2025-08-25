import { MessageProduct } from '../../domain/entity/message-product.entity';
import { MessageProductOutput } from '../dtos/message-product.output';

export class MessageProductMapper {
  static toOutputDto(messageProduct: MessageProduct): MessageProductOutput {
    return {
      id: messageProduct.id,
      messageId: messageProduct.messageId,
      productData: messageProduct.productData,
      createdAt: messageProduct.createdAt,
    };
  }
}
