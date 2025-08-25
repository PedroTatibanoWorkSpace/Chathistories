import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatOrmEntity } from './infrastructure/outbound/persistence/orm/chat-orm.entity';
import { ChatsProviders } from './chats.di';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatOrmEntity]),
  ],
  providers: [
    ...ChatsProviders,
  ],
  exports: [
    'CreateChatPort',
    'FindChatByIdPort',
    'FindChatByExternalIdPort',
    'PaginateChatsPort',
    'ChatRepositoryPort',
  ],
})
export class ChatsModule {}
