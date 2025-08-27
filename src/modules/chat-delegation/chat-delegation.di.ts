import { Provider } from '@nestjs/common';
import { CreateChatDelegationUseCase } from './application/use-cases/create-chat-delegation.use-case';
import { FindChatDelegationByIdUseCase } from './application/use-cases/find-chat-delegation-by-id.use-case';
import { FindChatDelegationByChatIdUseCase } from './application/use-cases/find-chat-delegation-by-chat-id.use-case';
import { PaginateChatDelegationsUseCase } from './application/use-cases/paginate-chat-delegations.use-case';
import { TypeOrmChatDelegationRepository } from './infrastructure/outbound/persistence/chat-delegation-typeorm.repository';

export const ChatDelegationProviders: Provider[] = [
  {
    provide: 'CreateChatDelegationPort',
    useClass: CreateChatDelegationUseCase,
  },
  {
    provide: 'FindChatDelegationByIdPort',
    useClass: FindChatDelegationByIdUseCase,
  },
  {
    provide: 'FindChatDelegationByChatIdPort',
    useClass: FindChatDelegationByChatIdUseCase,
  },
  {
    provide: 'PaginateChatDelegationsPort',
    useClass: PaginateChatDelegationsUseCase,
  },
  {
    provide: 'ChatDelegationRepositoryPort',
    useClass: TypeOrmChatDelegationRepository,
  },
];
