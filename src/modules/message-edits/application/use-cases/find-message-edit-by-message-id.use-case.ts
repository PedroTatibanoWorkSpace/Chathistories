import { Inject, Injectable } from '@nestjs/common';
import type { MessageEditRepositoryPort } from '../../domain/ports/outbounds/message-edit.repository.port';
import type { FindMessageEditByMessageIdPort } from '../../domain/ports/inbounds/find-message-edit-by-message-id.port';
import { MessageEditOutput } from '../dtos/message-edit.output';
import { MessageEditMapper } from '../mappers/message-edit-application.mapper';

@Injectable()
export class FindMessageEditByMessageIdUseCase implements FindMessageEditByMessageIdPort {
  constructor(
    @Inject('MessageEditRepositoryPort')
    private readonly messageEditRepository: MessageEditRepositoryPort,
  ) {}

  async execute(messageId: string): Promise<MessageEditOutput | null> {
    const messageEdit = await this.messageEditRepository.findMessageEditByMessageId(messageId);
    return messageEdit ? MessageEditMapper.toOutputDto(messageEdit) : null;
  }
}
