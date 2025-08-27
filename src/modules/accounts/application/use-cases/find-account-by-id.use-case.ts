import { Inject, Injectable } from '@nestjs/common';
import type { FindAccountByIdPort } from '../../domain/ports/inbounds/find-account-by-id.port';
import type { AccountRepositoryPort } from '../../domain/ports/outbounds/account.repository.port';
import { AccountMapper } from '../mappers/account-application.mapper';
import { AccountOutput } from '../dtos/account.output';

@Injectable()
export class FindAccountByIdUseCase implements FindAccountByIdPort {
  constructor(
    @Inject('AccountRepositoryPort')
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  async execute(id: string): Promise<AccountOutput | null> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      return null;
    }

    return AccountMapper.toOutputDto(account);
  }
}
