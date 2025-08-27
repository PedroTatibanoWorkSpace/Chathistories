import { Provider } from '@nestjs/common';
import { CreateAccountUseCase } from './application/use-cases/create-account.use-case';
import { FindAccountByIdUseCase } from './application/use-cases/find-account-by-id.use-case';
import { TypeOrmAccountRepository } from './infrastructure/outbound/persistence/account-typeorm.repository';
import { FindAccountByExternalIdUseCase } from './application/use-cases/find-account-by-external-id.use-case';
import { PaginateAccountsUseCase } from './application/use-cases/paginate-accounts.use-case';

export const AccountProviders: Provider[] = [
  {
    provide: 'CreateAccountPort',
    useClass: CreateAccountUseCase,
  },
  {
    provide: 'FindAccountByIdPort',
    useClass: FindAccountByIdUseCase,
  },
  {
    provide: 'FindAccountByExternalIdPort',
    useClass: FindAccountByExternalIdUseCase,
  },
   {
    provide: 'PaginateAccountsPort',
    useClass: PaginateAccountsUseCase,
  },
  {
    provide: 'AccountRepositoryPort',
    useClass: TypeOrmAccountRepository,
  },
];
