import { Inject, Injectable } from '@nestjs/common';
import type { MessageEditRepositoryPort } from '../../domain/ports/outbounds/message-edit.repository.port';
import type { FindMessageEditByIdPort } from '../../domain/ports/inbounds/find-message-edit-by-id.port';
import { MessageEditOutput } from '../dtos/message-edit.output';
import { MessageEditMapper } from '../mappers/message-edit-application.mapper';

@Injectable()
export class FindMessageEditByIdUseCase implements FindMessageEditByIdPort {
  constructor(
    @Inject('MessageEditRepositoryPort')
    private readonly messageEditRepository: MessageEditRepositoryPort,
  ) {}

  async execute(id: string): Promise<MessageEditOutput | null> {
    const messageEdit = await this.messageEditRepository.findById(id);
    return messageEdit ? MessageEditMapper.toOutputDto(messageEdit) : null;
  }
}
