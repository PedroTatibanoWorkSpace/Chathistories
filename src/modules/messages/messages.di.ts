import { Provider } from '@nestjs/common';
import { CreateMessageUseCase } from './application/use-cases/create-message.use-case';
import { FindMessageByIdUseCase } from './application/use-cases/find-message-by-id.use-case';
import { FindMessageByExternalIdUseCase } from './application/use-cases/find-message-by-external-id.use-case';
import { PaginateMessagesUseCase } from './application/use-cases/paginate-messages.use-case';
import { TypeOrmMessageRepository } from './infrastructure/outbound/persistence/message-typeorm.repository';

export const MessagesProviders: Provider[] = [
  {
    provide: 'CreateMessagePort',
    useClass: CreateMessageUseCase,
  },
  {
    provide: 'FindMessageByIdPort',
    useClass: FindMessageByIdUseCase,
  },
  {
    provide: 'FindMessageByExternalIdPort',
    useClass: FindMessageByExternalIdUseCase,
  },
  {
    provide: 'PaginateMessagesPort',
    useClass: PaginateMessagesUseCase,
  },
  {
    provide: 'MessageRepositoryPort',
    useClass: TypeOrmMessageRepository,
  },
];
