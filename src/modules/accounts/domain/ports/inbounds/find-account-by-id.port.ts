import { Account } from "../../entity/account.entity";

export interface FindAccountByIdPort {
  execute(id: string): Promise<Account | null>;
}
