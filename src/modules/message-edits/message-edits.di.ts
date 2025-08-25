import { Provider } from '@nestjs/common';
import { CreateMessageEditUseCase } from './application/use-cases/create-message-edit.use-case';
import { FindMessageEditByIdUseCase } from './application/use-cases/find-message-edit-by-id.use-case';
import { FindMessageEditByMessageIdUseCase } from './application/use-cases/find-message-edit-by-message-id.use-case';
import { PaginateMessageEditsUseCase } from './application/use-cases/paginate-message-edits.use-case';
import { TypeOrmMessageEditRepository } from './infrastructure/outbound/persistence/message-edit-typeorm.repository';

export const MessageEditsProviders: Provider[] = [
  {
    provide: 'CreateMessageEditPort',
    useClass: CreateMessageEditUseCase,
  },
  {
    provide: 'FindMessageEditByIdPort',
    useClass: FindMessageEditByIdUseCase,
  },
  {
    provide: 'FindMessageEditByMessageIdPort',
    useClass: FindMessageEditByMessageIdUseCase,
  },
  {
    provide: 'PaginateMessageEditsPort',
    useClass: PaginateMessageEditsUseCase,
  },
  {
    provide: 'MessageEditRepositoryPort',
    useClass: TypeOrmMessageEditRepository,
  },
];
