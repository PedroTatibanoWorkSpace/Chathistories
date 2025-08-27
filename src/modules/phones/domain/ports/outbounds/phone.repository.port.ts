import { BaseRepositoryPort } from 'src/common/domain/ports/base-repository.port';
import { Phone } from '../../entity/phone.entity';

export type PhoneQuery = {
  externalId?: string;
  accountId?: string;
};

export interface PhoneRepositoryPort
  extends BaseRepositoryPort<Phone, PhoneQuery> {
  findPhoneByExternalId(externalId: string): Promise<Phone | null>;
}
