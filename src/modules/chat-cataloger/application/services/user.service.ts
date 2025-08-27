import { Inject, Injectable, Logger } from '@nestjs/common';
import type { CreateUserPort } from '../../../users/domain/ports/inbounds/create-user.port';
import type { FindUserByExternalIdPort } from '../../../users/domain/ports/inbounds/find-user-by-external-id.port';
import { AccountService } from './account.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject('CreateUserPort')
    private readonly createUserPort: CreateUserPort,
    @Inject('FindUserByExternalIdPort')
    private readonly findUserByExternalIdPort: FindUserByExternalIdPort,
    private readonly accountService: AccountService,
  ) {}

  async ensureUserExists(
    userExternalId: string,
    accountExternalId: string,
  ): Promise<string> {
    const existingUser =
      await this.findUserByExternalIdPort.execute(userExternalId);

    if (!existingUser) {
      const accountId =
        await this.accountService.ensureAccountExists(accountExternalId);

      const createdUser = await this.createUserPort.execute({
        externalId: userExternalId,
        accountId: accountId,
      });
      return createdUser.id;
    }

    return existingUser.id;
  }
}
