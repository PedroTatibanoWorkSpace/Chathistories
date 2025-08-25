import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneOrmEntity } from './infrastructure/outbound/persistence/orm/phone-orm.entity';
import { PhonesProviders } from './phones.di';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhoneOrmEntity]),
  ],
  providers: [
    ...PhonesProviders,
  ],
  exports: [
    'CreatePhonePort',
    'FindPhoneByIdPort',
    'FindPhoneByExternalIdPort',
    'PaginatePhonesPort',
    'PhoneRepositoryPort',
  ],
})
export class PhonesModule {}
