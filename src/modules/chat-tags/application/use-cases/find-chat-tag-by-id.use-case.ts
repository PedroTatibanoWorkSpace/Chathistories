import { Inject, Injectable } from '@nestjs/common';
import type { ChatTagRepositoryPort } from '../../domain/ports/outbounds/chat-tag.repository.port';
import type { FindChatTagByIdPort } from '../../domain/ports/inbounds/find-chat-tag-by-id.port';
import { ChatTagOutput } from '../dtos/chat-tag.output';
import { ChatTagMapper } from '../mappers/chat-tag-application.mapper';

@Injectable()
export class FindChatTagByIdUseCase implements FindChatTagByIdPort {
  constructor(
    @Inject('ChatTagRepositoryPort')
    private readonly chatTagRepository: ChatTagRepositoryPort,
  ) {}

  async execute(id: string): Promise<ChatTagOutput | null> {
    const chatTag = await this.chatTagRepository.findById(id);
    return chatTag ? ChatTagMapper.toOutputDto(chatTag) : null;
  }
}
