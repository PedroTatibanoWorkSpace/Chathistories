import { Inject, Injectable } from '@nestjs/common';
import type { MessageRepositoryPort } from '../../domain/ports/outbounds/message.repository.port';
import type { FindMessageByExternalIdPort } from '../../domain/ports/inbounds/find-message-by-external-id.port';
import { MessageOutput } from '../dtos/message.output';
import { MessageMapper } from '../mappers/message-application.mapper';

@Injectable()
export class FindMessageByExternalIdUseCase implements FindMessageByExternalIdPort {
  constructor(
    @Inject('MessageRepositoryPort')
    private readonly messageRepository: MessageRepositoryPort,
  ) {}

  async execute(externalId: string): Promise<MessageOutput | null> {
    const message = await this.messageRepository.findMessageByExternalId(externalId);
    return message ? MessageMapper.toOutputDto(message) : null;
  }
}
