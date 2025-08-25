import { Inject, Injectable } from '@nestjs/common';
import type { MessageProductRepositoryPort } from '../../domain/ports/outbounds/message-product.repository.port';
import type { PaginateMessageProductsPort } from '../../domain/ports/inbounds/paginate-message-products.port';
import { PaginateMessageProductsInputDto } from '../dtos/paginate-message-products-input.dto';
import { MessageProductOutput } from '../dtos/message-product.output';
import { MessageProductMapper } from '../mappers/message-product-application.mapper';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';

@Injectable()
export class PaginateMessageProductsUseCase implements PaginateMessageProductsPort {
  constructor(
    @Inject('MessageProductRepositoryPort')
    private readonly messageProductRepository: MessageProductRepositoryPort,
  ) {}

  async execute(
    input: PaginateMessageProductsInputDto,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<MessageProductOutput>> {
    const result = await this.messageProductRepository.paginate(input, params);
    
    return {
      items: result.items.map(MessageProductMapper.toOutputDto),
      total: result.total,
    };
  }
}
