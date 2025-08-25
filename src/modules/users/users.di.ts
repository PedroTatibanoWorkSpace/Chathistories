import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';
import { FindUserByExternalIdUseCase } from './application/use-cases/find-user-by-external-id.use-case';
import { PaginateUsersUseCase } from './application/use-cases/paginate-users.use-case';
import { TypeOrmUserRepository } from './infrastructure/outbound/persistence/user-typeorm.repository';

export const UsersProviders: Provider[] = [
  {
    provide: 'CreateUserPort',
    useClass: CreateUserUseCase,
  },
  {
    provide: 'FindUserByIdPort',
    useClass: FindUserByIdUseCase,
  },
  {
    provide: 'FindUserByExternalIdPort',
    useClass: FindUserByExternalIdUseCase,
  },
  {
    provide: 'PaginateUsersPort',
    useClass: PaginateUsersUseCase,
  },
  {
    provide: 'UserRepositoryPort',
    useClass: TypeOrmUserRepository,
  },
];
