import { Provider } from '@nestjs/common';
import { CreateChatUseCase } from './application/use-cases/create-chat.use-case';
import { FindChatByIdUseCase } from './application/use-cases/find-chat-by-id.use-case';
import { FindChatByExternalIdUseCase } from './application/use-cases/find-chat-by-external-id.use-case';
import { PaginateChatsUseCase } from './application/use-cases/paginate-chats.use-case';
import { TypeOrmChatRepository } from './infrastructure/outbound/persistence/chat-typeorm.repository';

export const ChatsProviders: Provider[] = [
  {
    provide: 'CreateChatPort',
    useClass: CreateChatUseCase,
  },
  {
    provide: 'FindChatByIdPort',
    useClass: FindChatByIdUseCase,
  },
  {
    provide: 'FindChatByExternalIdPort',
    useClass: FindChatByExternalIdUseCase,
  },
  {
    provide: 'PaginateChatsPort',
    useClass: PaginateChatsUseCase,
  },
  {
    provide: 'ChatRepositoryPort',
    useClass: TypeOrmChatRepository,
  },
];
