import { Inject, Injectable } from '@nestjs/common';
import type { MessageProductRepositoryPort } from '../../domain/ports/outbounds/message-product.repository.port';
import type { FindMessageProductByMessageIdPort } from '../../domain/ports/inbounds/find-message-product-by-message-id.port';
import { MessageProductOutput } from '../dtos/message-product.output';
import { MessageProductMapper } from '../mappers/message-product-application.mapper';

@Injectable()
export class FindMessageProductByMessageIdUseCase implements FindMessageProductByMessageIdPort {
  constructor(
    @Inject('MessageProductRepositoryPort')
    private readonly messageProductRepository: MessageProductRepositoryPort,
  ) {}

  async execute(messageId: string): Promise<MessageProductOutput | null> {
    const messageProduct = await this.messageProductRepository.findMessageProductByMessageId(messageId);
    return messageProduct ? MessageProductMapper.toOutputDto(messageProduct) : null;
  }
}
