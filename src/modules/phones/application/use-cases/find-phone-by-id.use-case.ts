import { Inject, Injectable } from '@nestjs/common';
import type { PhoneRepositoryPort } from '../../domain/ports/outbounds/phone.repository.port';
import type { FindPhoneByIdPort } from '../../domain/ports/inbounds/find-phone-by-id.port';
import { PhoneOutput } from '../dtos/phone.output';
import { PhoneMapper } from '../mappers/phone-application.mapper';

@Injectable()
export class FindPhoneByIdUseCase implements FindPhoneByIdPort {
  constructor(
    @Inject('PhoneRepositoryPort')
    private readonly phoneRepository: PhoneRepositoryPort,
  ) {}

  async execute(id: string): Promise<PhoneOutput | null> {
    const phone = await this.phoneRepository.findById(id);
    return phone ? PhoneMapper.toOutputDto(phone) : null;
  }
}
