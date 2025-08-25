import { Provider } from '@nestjs/common';
import { CreateChatTagUseCase } from './application/use-cases/create-chat-tag.use-case';
import { FindChatTagByIdUseCase } from './application/use-cases/find-chat-tag-by-id.use-case';
import { FindChatTagByChatIdUseCase } from './application/use-cases/find-chat-tag-by-chat-id.use-case';
import { PaginateChatTagsUseCase } from './application/use-cases/paginate-chat-tags.use-case';
import { TypeOrmChatTagRepository } from './infrastructure/outbound/persistence/chat-tag-typeorm.repository';

export const ChatTagsProviders: Provider[] = [
  {
    provide: 'CreateChatTagPort',
    useClass: CreateChatTagUseCase,
  },
  {
    provide: 'FindChatTagByIdPort',
    useClass: FindChatTagByIdUseCase,
  },
  {
    provide: 'FindChatTagByChatIdPort',
    useClass: FindChatTagByChatIdUseCase,
  },
  {
    provide: 'PaginateChatTagsPort',
    useClass: PaginateChatTagsUseCase,
  },
  {
    provide: 'ChatTagRepositoryPort',
    useClass: TypeOrmChatTagRepository,
  },
];
