import { Inject, Injectable } from '@nestjs/common';
import type { MessageEditRepositoryPort } from '../../domain/ports/outbounds/message-edit.repository.port';
import { CreateMessageEditInputDto } from '../dtos/create-message-edit-input.dto';
import { MessageEdit } from '../../domain/entity/message-edit.entity';
import type { CreateMessageEditPort } from '../../domain/ports/inbounds/create-message-edit.port';
import { MessageEditOutput } from '../dtos/message-edit.output';
import { MessageEditMapper } from '../mappers/message-edit-application.mapper';

@Injectable()
export class CreateMessageEditUseCase implements CreateMessageEditPort {
  constructor(
    @Inject('MessageEditRepositoryPort')
    private readonly messageEditRepository: MessageEditRepositoryPort,
  ) {}

  async execute(input: CreateMessageEditInputDto): Promise<MessageEditOutput> {
    const messageEdit = MessageEdit.create(input);
    const createdMessageEdit = await this.messageEditRepository.create(messageEdit);
    return MessageEditMapper.toOutputDto(createdMessageEdit);
  }
}
