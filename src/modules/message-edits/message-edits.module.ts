import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEditOrmEntity } from './infrastructure/outbound/persistence/orm/message-edit-orm.entity';
import { MessageEditsProviders } from './message-edits.di';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEditOrmEntity]),
  ],
  providers: [
    ...MessageEditsProviders,
  ],
  exports: [
    'CreateMessageEditPort',
    'FindMessageEditByIdPort',
    'FindMessageEditByMessageIdPort',
    'PaginateMessageEditsPort',
    'MessageEditRepositoryPort',
  ],
})
export class MessageEditsModule {}
