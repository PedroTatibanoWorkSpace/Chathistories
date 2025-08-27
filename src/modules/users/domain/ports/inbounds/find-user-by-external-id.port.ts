import { User } from "../../entity/user.entity";

export interface FindUserByExternalIdPort {
  execute(externalId: string): Promise<User | null>;
}
