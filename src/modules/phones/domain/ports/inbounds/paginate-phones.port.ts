import { Phone } from '../../entity/phone.entity';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { PhoneQuery } from '../outbounds/phone.repository.port';

export interface PaginatePhonesPort {
  execute(
    input: PhoneQuery,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<Phone>>;
}
