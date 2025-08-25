import { Phone } from '../../domain/entity/phone.entity';
import { PhoneOutput } from '../dtos/phone.output';

export class PhoneMapper {
  static toOutputDto(phone: Phone): PhoneOutput {
    return {
      id: phone.id,
      externalId: phone.externalId,
      accountId: phone.accountId,
      createdAt: phone.createdAt,
      updatedAt: phone.updatedAt,
    };
  }
}
