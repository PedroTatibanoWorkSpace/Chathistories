import { User } from '../../entity/user.entity';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { UserQuery } from '../outbounds/user.repository.port';

export interface PaginateUsersPort {
  execute(
    input: UserQuery,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<User>>;
}
