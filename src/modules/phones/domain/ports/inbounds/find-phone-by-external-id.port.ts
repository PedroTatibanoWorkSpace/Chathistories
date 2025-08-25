import { Phone } from "../../entity/phone.entity";

export interface FindPhoneByExternalIdPort {
  execute(externalId: string): Promise<Phone | null>;
}
