import type { PhoneRepositoryPort } from '../../domain/ports/outbounds/phone.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { PaginatePhonesPort } from '../../domain/ports/inbounds/paginate-phones.port';
import { PaginatePhonesInputDto } from '../dtos/paginate-phones-input.dto';
import { PhoneMapper } from '../mappers/phone-application.mapper';
import { PhoneOutput } from '../dtos/phone.output';

@Injectable()
export class PaginatePhonesUseCase implements PaginatePhonesPort {
  constructor(
    @Inject('PhoneRepositoryPort')
    private readonly phoneRepository: PhoneRepositoryPort,
  ) {}

  async execute(
    input: PaginatePhonesInputDto,
    params: PaginationParams,
  ): Promise<PaginatedResult<PhoneOutput>> {
    const { items, total } = await this.phoneRepository.paginate(
      input,
      params,
    );

    const mapped = items.map((item) => PhoneMapper.toOutputDto(item));

    return {
      items: mapped,
      total,
    };
  }
}
