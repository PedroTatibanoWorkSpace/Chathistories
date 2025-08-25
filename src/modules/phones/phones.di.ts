import { Provider } from '@nestjs/common';
import { CreatePhoneUseCase } from './application/use-cases/create-phone.use-case';
import { FindPhoneByIdUseCase } from './application/use-cases/find-phone-by-id.use-case';
import { FindPhoneByExternalIdUseCase } from './application/use-cases/find-phone-by-external-id.use-case';
import { PaginatePhonesUseCase } from './application/use-cases/paginate-phones.use-case';
import { TypeOrmPhoneRepository } from './infrastructure/outbound/persistence/phone-typeorm.repository';
export const PhonesProviders: Provider[] = [
  {
    provide: 'CreatePhonePort',
    useClass: CreatePhoneUseCase,
  },
  {
    provide: 'FindPhoneByIdPort',
    useClass: FindPhoneByIdUseCase,
  },
  {
    provide: 'FindPhoneByExternalIdPort',
    useClass: FindPhoneByExternalIdUseCase,
  },
  {
    provide: 'PaginatePhonesPort',
    useClass: PaginatePhonesUseCase,
  },
  {
    provide: 'PhoneRepositoryPort',
    useClass: TypeOrmPhoneRepository,
  },
];
