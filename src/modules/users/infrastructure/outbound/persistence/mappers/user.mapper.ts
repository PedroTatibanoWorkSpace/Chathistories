import { User } from 'src/modules/users/domain/entity/user.entity';
import { UserOrmEntity } from '../orm/user-orm.entity';

export class UserMapper {
  static toOrmEntity(domainUser: User): UserOrmEntity {
    return {
      id: domainUser.id,
      externalId: domainUser.externalId,
      accountId: domainUser.accountId,
      createdAt: domainUser.createdAt,
      updatedAt: domainUser.updatedAt,
    };
  }

  static toDomainEntity(ormUser: UserOrmEntity): User {
    return User.reconstruct({
      id: ormUser.id,
      externalId: ormUser.externalId,
      accountId: ormUser.accountId,
      createdAt: ormUser.createdAt,
      updatedAt: ormUser.updatedAt,
    });
  }
}
