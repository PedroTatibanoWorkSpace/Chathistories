import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountOrmEntity } from './infrastructure/outbound/persistence/orm/account-orm.entity';
import { AccountProviders } from './account.di';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountOrmEntity]),
  ],
  providers: [
    ...AccountProviders,
  ],
  exports: [
    'CreateAccountPort',
    'FindAccountByIdPort',
    'FindAccountByExternalIdPort',
    'PaginateAccountsPort',
    'AccountRepositoryPort',
  ],
})
export class AccountModule {}
