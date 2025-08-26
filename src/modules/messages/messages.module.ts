import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageOrmEntity } from './infrastructure/outbound/persistence/orm/message-orm.entity';
import { MessagesProviders } from './messages.di';
import { MessageProductsModule } from '../message-products/message-products.module';
import { MessageEditsModule } from '../message-edits/message-edits.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageOrmEntity]),
    MessageProductsModule,
    MessageEditsModule,
  ],
  providers: [
    ...MessagesProviders,
  ],
  exports: [
    'CreateMessagePort',
    'FindMessageByIdPort',
    'FindMessageByExternalIdPort',
    'PaginateMessagesPort',
    'MessageRepositoryPort',
  ],
})
export class MessagesModule {}
