import type { AccountRepositoryPort } from '../../domain/ports/outbounds/account.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { AccountMapper } from '../mappers/account-application.mapper';
import type { PaginateAccountsPort } from '../../domain/ports/inbounds/paginate-accounts.port';
import { PaginateAccountsInputDto } from '../dtos/paginate-accounts-input.dto';
import { AccountOutput } from '../dtos/account.output';

@Injectable()
export class PaginateAccountsUseCase implements PaginateAccountsPort {
  constructor(
    @Inject('AccountRepositoryPort')
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  async execute(
    input: PaginateAccountsInputDto,
    params: PaginationParams,
  ): Promise<PaginatedResult<AccountOutput>> {
    const { items, total } = await this.accountRepository.paginate(
      input,
      params,
    );

    const mapped = items.map((item) => AccountMapper.toOutputDto(item));

    return {
      items: mapped,
      total,
    };
  }
}
