import { Account } from '../../domain/entity/account.entity';
import { AccountOutput } from '../dtos/account.output';

export class AccountMapper {
  static toOutputDto(account: Account): AccountOutput {
    return {
      id: account.id,
      externalId: account.externalId,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
}
