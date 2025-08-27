import { Account } from '../../entity/account.entity';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { AccountQuery } from '../outbounds/account.repository.port';

export interface PaginateAccountsPort {
  execute(
    input: AccountQuery,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<Account>>;
}
