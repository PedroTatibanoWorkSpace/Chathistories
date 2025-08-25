import { Inject, Injectable } from '@nestjs/common';
import type { MessageProductRepositoryPort } from '../../domain/ports/outbounds/message-product.repository.port';
import { CreateMessageProductInputDto } from '../dtos/create-message-product-input.dto';
import { MessageProduct } from '../../domain/entity/message-product.entity';
import type { CreateMessageProductPort } from '../../domain/ports/inbounds/create-message-product.port';
import { MessageProductOutput } from '../dtos/message-product.output';
import { MessageProductMapper } from '../mappers/message-product-application.mapper';

@Injectable()
export class CreateMessageProductUseCase implements CreateMessageProductPort {
  constructor(
    @Inject('MessageProductRepositoryPort')
    private readonly messageProductRepository: MessageProductRepositoryPort,
  ) {}

  async execute(input: CreateMessageProductInputDto): Promise<MessageProductOutput> {
    const messageProduct = MessageProduct.create(input);
    const createdMessageProduct = await this.messageProductRepository.create(messageProduct);
    return MessageProductMapper.toOutputDto(createdMessageProduct);
  }
}
