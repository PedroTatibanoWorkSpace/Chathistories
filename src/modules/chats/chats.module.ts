import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatOrmEntity } from './infrastructure/outbound/persistence/orm/chat-orm.entity';
import { ChatsProviders } from './chats.di';
import { PaginateChatsHandler } from './infrastructure/inbound/handlers/paginate-chats.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatOrmEntity]),
  ],
  providers: [
    ...ChatsProviders,
  ],
  controllers:[
    PaginateChatsHandler
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
