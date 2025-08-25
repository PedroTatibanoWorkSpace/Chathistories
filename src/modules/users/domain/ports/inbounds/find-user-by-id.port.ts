import { User } from "../../entity/user.entity";

export interface FindUserByIdPort {
  execute(id: string): Promise<User | null>;
}
