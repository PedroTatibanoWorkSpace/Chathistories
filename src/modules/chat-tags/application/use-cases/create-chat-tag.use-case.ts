import { Inject, Injectable } from '@nestjs/common';
import type { ChatTagRepositoryPort } from '../../domain/ports/outbounds/chat-tag.repository.port';
import { CreateChatTagInputDto } from '../dtos/create-chat-tag-input.dto';
import { ChatTag } from '../../domain/entity/chat-tag.entity';
import type { CreateChatTagPort } from '../../domain/ports/inbounds/create-chat-tag.port';
import { ChatTagOutput } from '../dtos/chat-tag.output';
import { ChatTagMapper } from '../mappers/chat-tag-application.mapper';

@Injectable()
export class CreateChatTagUseCase implements CreateChatTagPort {
  constructor(
    @Inject('ChatTagRepositoryPort')
    private readonly chatTagRepository: ChatTagRepositoryPort,
  ) {}

  async execute(input: CreateChatTagInputDto): Promise<ChatTagOutput> {
    const chatTag = ChatTag.create(input);
    const createdChatTag = await this.chatTagRepository.create(chatTag);
    return ChatTagMapper.toOutputDto(createdChatTag);
  }
}
