import { Injectable, Logger, Inject} from '@nestjs/common';
import type { CreateAccountPort } from '../../../accounts/domain/ports/inbounds/create-account.port';
import type { FindAccountByExternalIdPort } from '../../../accounts/domain/ports/inbounds/find-account-by-external-id.port';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(
    @Inject('CreateAccountPort')
    private readonly createAccountPort: CreateAccountPort,
    @Inject('FindAccountByExternalIdPort')
    private readonly findAccountByExternalIdPort: FindAccountByExternalIdPort,
  ) {}

  async ensureAccountExists(accountExternalId: string): Promise<string> {
    const existingAccount =
      await this.findAccountByExternalIdPort.execute(accountExternalId);

    if (!existingAccount) {
      const createdAccount = await this.createAccountPort.execute({
        externalId: accountExternalId,
      });
      return createdAccount.id;
    }

    return existingAccount.id;
  }
}
