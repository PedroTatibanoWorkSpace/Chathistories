import { Inject, Injectable } from '@nestjs/common';
import type { ChatTagRepositoryPort } from '../../domain/ports/outbounds/chat-tag.repository.port';
import type { FindChatTagByChatIdPort } from '../../domain/ports/inbounds/find-chat-tag-by-chat-id.port';
import { ChatTagOutput } from '../dtos/chat-tag.output';
import { ChatTagMapper } from '../mappers/chat-tag-application.mapper';

@Injectable()
export class FindChatTagByChatIdUseCase implements FindChatTagByChatIdPort {
  constructor(
    @Inject('ChatTagRepositoryPort')
    private readonly chatTagRepository: ChatTagRepositoryPort,
  ) {}

  async execute(chatId: string): Promise<ChatTagOutput | null> {
    const chatTag = await this.chatTagRepository.findChatTagByChatId(chatId);
    return chatTag ? ChatTagMapper.toOutputDto(chatTag) : null;
  }
}
