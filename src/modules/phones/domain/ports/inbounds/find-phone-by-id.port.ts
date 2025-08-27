import { Phone } from "../../entity/phone.entity";

export interface FindPhoneByIdPort {
  execute(id: string): Promise<Phone | null>;
}
