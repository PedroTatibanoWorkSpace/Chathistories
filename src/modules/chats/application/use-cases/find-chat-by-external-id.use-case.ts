import { Inject, Injectable } from '@nestjs/common';
import type { ChatRepositoryPort } from '../../domain/ports/outbounds/chat.repository.port';
import type { FindChatByExternalIdPort } from '../../domain/ports/inbounds/find-chat-by-external-id.port';
import { ChatOutput } from '../dtos/chat.output';
import { ChatMapper } from '../mappers/chat-application.mapper';

@Injectable()
export class FindChatByExternalIdUseCase implements FindChatByExternalIdPort {
  constructor(
    @Inject('ChatRepositoryPort')
    private readonly chatRepository: ChatRepositoryPort,
  ) {}

  async execute(externalId: string): Promise<ChatOutput | null> {
    const chat = await this.chatRepository.findChatByExternalId(externalId);
    return chat ? ChatMapper.toOutputDto(chat) : null;
  }
}
