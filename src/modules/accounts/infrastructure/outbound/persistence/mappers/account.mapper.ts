import { Account } from 'src/modules/accounts/domain/entity/account.entity';
import { AccountOrmEntity } from '../orm/account-orm.entity';

export class AccountMapper {
  static toOrmEntity(domainAccount: Account): AccountOrmEntity {
    return {
      id: domainAccount.id,
      externalId: domainAccount.externalId,
      createdAt: domainAccount.createdAt,
      updatedAt: domainAccount.updatedAt,
    };
  }

  static toDomainEntity(ormAccount: AccountOrmEntity): Account {
    return Account.reconstruct({
      id: ormAccount.id,
      externalId: ormAccount.externalId,
      createdAt: ormAccount.createdAt,
      updatedAt: ormAccount.updatedAt,
    });
  }
}
