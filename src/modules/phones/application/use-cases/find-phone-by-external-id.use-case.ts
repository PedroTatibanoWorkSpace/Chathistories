import { Inject, Injectable } from '@nestjs/common';
import type { PhoneRepositoryPort } from '../../domain/ports/outbounds/phone.repository.port';
import type { FindPhoneByExternalIdPort } from '../../domain/ports/inbounds/find-phone-by-external-id.port';
import { PhoneOutput } from '../dtos/phone.output';
import { PhoneMapper } from '../mappers/phone-application.mapper';

@Injectable()
export class FindPhoneByExternalIdUseCase implements FindPhoneByExternalIdPort {
  constructor(
    @Inject('PhoneRepositoryPort')
    private readonly phoneRepository: PhoneRepositoryPort,
  ) {}

  async execute(externalId: string): Promise<PhoneOutput | null> {
    const phone = await this.phoneRepository.findPhoneByExternalId(externalId);
    return phone ? PhoneMapper.toOutputDto(phone) : null;
  }
}
