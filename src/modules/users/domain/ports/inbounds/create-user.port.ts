import { User } from "../../entity/user.entity";

export type CreateUserProps = {
  externalId: string;
  accountId: string;
};

export interface CreateUserPort {
  execute(props: CreateUserProps): Promise<User>;
}
