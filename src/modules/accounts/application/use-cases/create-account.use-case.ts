import { Inject, Injectable } from '@nestjs/common';
import type { AccountRepositoryPort } from '../../domain/ports/outbounds/account.repository.port';
import { CreateAccountInputDto } from '../dtos/create-account-input.dto';
import { Account } from '../../domain/entity/account.entity';
import type { CreateAccountPort } from '../../domain/ports/inbounds/create-account.port';
import { AccountOutput } from '../dtos/account.output';
import { AccountMapper } from '../mappers/account-application.mapper';

@Injectable()
export class CreateAccountUseCase implements CreateAccountPort {
  constructor(
    @Inject('AccountRepositoryPort')
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  async execute(input: CreateAccountInputDto): Promise<AccountOutput> {
    const account = Account.create(input);

    const createdAccount = await this.accountRepository.create(account);

    return AccountMapper.toOutputDto(createdAccount);
  }
}
