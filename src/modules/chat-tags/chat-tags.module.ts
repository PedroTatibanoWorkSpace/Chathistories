import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatTagOrmEntity } from './infrastructure/outbound/persistence/orm/chat-tag-orm.entity';
import { ChatTagsProviders } from './chat-tags.di';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatTagOrmEntity]),
  ],
  providers: [
    ...ChatTagsProviders,
  ],
  exports: [
    'CreateChatTagPort',
    'FindChatTagByIdPort',
    'FindChatTagByChatIdPort',
    'PaginateChatTagsPort',
    'ChatTagRepositoryPort',
  ],
})
export class ChatTagsModule {}
