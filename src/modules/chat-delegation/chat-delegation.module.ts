import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatDelegationOrmEntity } from './infrastructure/outbound/persistence/orm/chat-delegation-orm.entity';
import { ChatDelegationProviders } from './chat-delegation.di';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatDelegationOrmEntity]),
  ],
  providers: [
    ...ChatDelegationProviders,
  ],
  exports: [
    'CreateChatDelegationPort',
    'FindChatDelegationByIdPort',
    'FindChatDelegationByChatIdPort',
    'PaginateChatDelegationsPort',
    'ChatDelegationRepositoryPort',
  ],
})
export class ChatDelegationModule {}
