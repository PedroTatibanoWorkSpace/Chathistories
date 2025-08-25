import { Account } from "../../entity/account.entity";

export type CreateAccountProps = {
  externalId: string;
};

export interface CreateAccountPort {
  execute(props: CreateAccountProps): Promise<Account>;
}
