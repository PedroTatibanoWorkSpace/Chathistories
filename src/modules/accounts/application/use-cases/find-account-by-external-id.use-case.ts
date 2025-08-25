import { Inject, Injectable } from '@nestjs/common';
import { FindAccountByExternalIdPort } from '../../domain/ports/inbounds/find-account-by-external-id.port';
import type { AccountRepositoryPort } from '../../domain/ports/outbounds/account.repository.port';
import { AccountMapper } from '../mappers/account-application.mapper';
import { AccountOutput } from '../dtos/account.output';

@Injectable()
export class FindAccountByExternalIdUseCase implements FindAccountByExternalIdPort {
  constructor(
    @Inject('AccountRepositoryPort')
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  async execute(externalId: string): Promise<AccountOutput | null> {
    const account = await this.accountRepository.findAccountByExternalId(externalId);

    if (!account) {
      return null;
    }

    return AccountMapper.toOutputDto(account);
  }
}
