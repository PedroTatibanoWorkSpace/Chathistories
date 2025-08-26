import { Account } from "../../entity/account.entity";

export type CreateAccountProps = {
  externalId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface CreateAccountPort {
  execute(props: CreateAccountProps): Promise<Account>;
}
