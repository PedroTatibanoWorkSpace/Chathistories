import { Account } from "../../entity/account.entity";

export interface FindAccountByExternalIdPort {
  execute(externalId: string): Promise<Account | null>;
}
