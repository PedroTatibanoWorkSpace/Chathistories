import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/outbound/persistence/orm/user-orm.entity';
import { UsersProviders } from './users.di';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  providers: [
    ...UsersProviders,
  ],
  exports: [
    'CreateUserPort',
    'FindUserByIdPort',
    'FindUserByExternalIdPort',
    'PaginateUsersPort',
    'UserRepositoryPort',
  ],
})
export class UsersModule {}
