import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageOrmEntity } from './infrastructure/outbound/persistence/orm/message-orm.entity';
import { MessagesProviders } from './messages.di';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageOrmEntity]),
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
