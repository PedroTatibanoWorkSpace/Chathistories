import { Phone } from 'src/modules/phones/domain/entity/phone.entity';
import { PhoneOrmEntity } from '../orm/phone-orm.entity';

export class PhoneMapper {
  static toOrmEntity(domainPhone: Phone): PhoneOrmEntity {
    return {
      id: domainPhone.id,
      externalId: domainPhone.externalId,
      accountId: domainPhone.accountId,
      createdAt: domainPhone.createdAt,
      updatedAt: domainPhone.updatedAt,
    };
  }

  static toDomainEntity(ormPhone: PhoneOrmEntity): Phone {
    return Phone.reconstruct({
      id: ormPhone.id,
      externalId: ormPhone.externalId,
      accountId: ormPhone.accountId,
      createdAt: ormPhone.createdAt,
      updatedAt: ormPhone.updatedAt,
    });
  }
}
