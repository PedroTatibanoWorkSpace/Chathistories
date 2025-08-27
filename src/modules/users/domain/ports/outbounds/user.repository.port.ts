import { BaseRepositoryPort } from 'src/common/domain/ports/base-repository.port';
import { User } from '../../entity/user.entity';

export type UserQuery = {
  externalId?: string;
  accountId?: string;
};

export interface UserRepositoryPort
  extends BaseRepositoryPort<User, UserQuery> {
  findUserByExternalId(externalId: string): Promise<User | null>;
}
