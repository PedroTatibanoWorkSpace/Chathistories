import { Phone } from "../../entity/phone.entity";

export type CreatePhoneProps = {
  externalId: string;
  accountId: string;
};

export interface CreatePhonePort {
  execute(props: CreatePhoneProps): Promise<Phone>;
}
