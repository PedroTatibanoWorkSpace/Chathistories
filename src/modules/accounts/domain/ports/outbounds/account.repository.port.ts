import { BaseRepositoryPort } from 'src/common/domain/ports/base-repository.port';
import { Account } from '../../entity/account.entity';

export type AccountQuery = {
  externalId?: string;
};

export interface AccountRepositoryPort
  extends BaseRepositoryPort<Account, AccountQuery> {
  findAccountByExternalId(externalId: string): Promise<Account | null>;
}
