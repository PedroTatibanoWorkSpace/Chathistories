import { Inject, Injectable } from '@nestjs/common';
import type { MessageRepositoryPort } from '../../domain/ports/outbounds/message.repository.port';
import { CreateMessageInputDto } from '../dtos/create-message-input.dto';
import { Message } from '../../domain/entity/message.entity';
import type { CreateMessagePort } from '../../domain/ports/inbounds/create-message.port';
import { MessageOutput } from '../dtos/message.output';
import { MessageMapper } from '../mappers/message-application.mapper';

@Injectable()
export class CreateMessageUseCase implements CreateMessagePort {
  constructor(
    @Inject('MessageRepositoryPort')
    private readonly messageRepository: MessageRepositoryPort,
  ) {}

  async execute(input: CreateMessageInputDto): Promise<MessageOutput> {
    const message = Message.create(input);
    const createdMessage = await this.messageRepository.create(message);
    return MessageMapper.toOutputDto(createdMessage);
  }
}
