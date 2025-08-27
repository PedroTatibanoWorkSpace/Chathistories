import { Inject, Injectable } from '@nestjs/common';
import type { MessageRepositoryPort } from '../../domain/ports/outbounds/message.repository.port';
import type { FindMessageByIdPort } from '../../domain/ports/inbounds/find-message-by-id.port';
import { MessageOutput } from '../dtos/message.output';
import { MessageMapper } from '../mappers/message-application.mapper';

@Injectable()
export class FindMessageByIdUseCase implements FindMessageByIdPort {
  constructor(
    @Inject('MessageRepositoryPort')
    private readonly messageRepository: MessageRepositoryPort,
  ) {}

  async execute(id: string): Promise<MessageOutput | null> {
    const message = await this.messageRepository.findById(id);
    return message ? MessageMapper.toOutputDto(message) : null;
  }
}
