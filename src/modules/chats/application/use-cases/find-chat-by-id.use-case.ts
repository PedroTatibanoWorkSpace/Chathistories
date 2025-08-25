import { Inject, Injectable } from '@nestjs/common';
import type { ChatRepositoryPort } from '../../domain/ports/outbounds/chat.repository.port';
import { ChatOutput } from '../dtos/chat.output';
import { ChatMapper } from '../mappers/chat-application.mapper';
import { FindChatByIdPort } from '../../domain/ports/inbounds/find-chat-by-id.port';

@Injectable()
export class FindChatByIdUseCase implements FindChatByIdPort {
  constructor(
    @Inject('ChatRepositoryPort')
    private readonly chatRepository: ChatRepositoryPort,
  ) {}

  async execute(id: string): Promise<ChatOutput | null> {
    const chat = await this.chatRepository.findById(id);
    return chat ? ChatMapper.toOutputDto(chat) : null;
  }
}
