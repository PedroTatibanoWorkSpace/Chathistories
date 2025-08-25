import { MessageProduct } from 'src/modules/message-products/domain/entity/message-product.entity';
import { MessageProductOrmEntity } from '../orm/message-product-orm.entity';

export class MessageProductMapper {
  static toOrmEntity(domainMessageProduct: MessageProduct): MessageProductOrmEntity {
    return {
      id: domainMessageProduct.id,
      messageId: domainMessageProduct.messageId,
      productData: domainMessageProduct.productData,
      createdAt: domainMessageProduct.createdAt,
    };
  }

  static toDomainEntity(ormMessageProduct: MessageProductOrmEntity): MessageProduct {
    return MessageProduct.reconstruct({
      id: ormMessageProduct.id,
      messageId: ormMessageProduct.messageId,
      productData: ormMessageProduct.productData,
      createdAt: ormMessageProduct.createdAt,
    });
  }
}
