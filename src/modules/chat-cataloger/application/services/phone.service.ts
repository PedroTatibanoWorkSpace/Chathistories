import { Injectable, Logger, Inject } from '@nestjs/common';
import type { CreatePhonePort } from '../../../phones/domain/ports/inbounds/create-phone.port';
import type { FindPhoneByExternalIdPort } from '../../../phones/domain/ports/inbounds/find-phone-by-external-id.port';
import { AccountService } from './account.service';

@Injectable()
export class PhoneService {
  private readonly logger = new Logger(PhoneService.name);

  constructor(
    @Inject('CreatePhonePort')
    private readonly createPhonePort: CreatePhonePort,
    @Inject('FindPhoneByExternalIdPort')    
    private readonly findPhoneByExternalIdPort: FindPhoneByExternalIdPort,
    private readonly accountService: AccountService,
  ) {}

  async ensurePhoneExists(
    phoneExternalId: string,
    accountExternalId: string,
  ): Promise<string> {
    const existingPhone =
      await this.findPhoneByExternalIdPort.execute(phoneExternalId);

    if (!existingPhone) {
      const accountId = await this.accountService.ensureAccountExists(accountExternalId);

      const createdPhone = await this.createPhonePort.execute({
        externalId: phoneExternalId,
        accountId: accountId,
      });
      return createdPhone.id;
    }

    return existingPhone.id;
  }
}
