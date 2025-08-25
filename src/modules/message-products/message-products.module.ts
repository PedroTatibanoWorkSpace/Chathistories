import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageProductOrmEntity } from './infrastructure/outbound/persistence/orm/message-product-orm.entity';
import { MessageProductsProviders } from './message-products.di';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageProductOrmEntity]),
  ],
  providers: [
    ...MessageProductsProviders,
  ],
  exports: [
    'CreateMessageProductPort',
    'FindMessageProductByIdPort',
    'FindMessageProductByMessageIdPort',
    'PaginateMessageProductsPort',
    'MessageProductRepositoryPort',
  ],
})
export class MessageProductsModule {}
