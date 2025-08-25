import { Inject, Injectable } from '@nestjs/common';
import type { PhoneRepositoryPort } from '../../domain/ports/outbounds/phone.repository.port';
import { CreatePhoneInputDto } from '../dtos/create-phone-input.dto';
import { Phone } from '../../domain/entity/phone.entity';
import type { CreatePhonePort } from '../../domain/ports/inbounds/create-phone.port';
import { PhoneOutput } from '../dtos/phone.output';
import { PhoneMapper } from '../mappers/phone-application.mapper';

@Injectable()
export class CreatePhoneUseCase implements CreatePhonePort {
  constructor(
    @Inject('PhoneRepositoryPort')
    private readonly phoneRepository: PhoneRepositoryPort,
  ) {}

  async execute(input: CreatePhoneInputDto): Promise<PhoneOutput> {
    const phone = Phone.create(input);
    const createdPhone = await this.phoneRepository.create(phone);
    return PhoneMapper.toOutputDto(createdPhone);
  }
}
