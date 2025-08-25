import { Inject, Injectable } from '@nestjs/common';
import type { MessageProductRepositoryPort } from '../../domain/ports/outbounds/message-product.repository.port';
import type { FindMessageProductByIdPort } from '../../domain/ports/inbounds/find-message-product-by-id.port';
import { MessageProductOutput } from '../dtos/message-product.output';
import { MessageProductMapper } from '../mappers/message-product-application.mapper';

@Injectable()
export class FindMessageProductByIdUseCase implements FindMessageProductByIdPort {
  constructor(
    @Inject('MessageProductRepositoryPort')
    private readonly messageProductRepository: MessageProductRepositoryPort,
  ) {}

  async execute(id: string): Promise<MessageProductOutput | null> {
    const messageProduct = await this.messageProductRepository.findById(id);
    return messageProduct ? MessageProductMapper.toOutputDto(messageProduct) : null;
  }
}
