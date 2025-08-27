import { Inject, Injectable } from '@nestjs/common';
import type { ChatRepositoryPort } from '../../domain/ports/outbounds/chat.repository.port';
import { CreateChatInputDto } from '../dtos/create-chat-input.dto';
import { Chat } from '../../domain/entity/chat.entity';
import type { CreateChatPort } from '../../domain/ports/inbounds/create-chat.port';
import { ChatOutput } from '../dtos/chat.output';
import { ChatMapper } from '../mappers/chat-application.mapper';

@Injectable()
export class CreateChatUseCase implements CreateChatPort {
  constructor(
    @Inject('ChatRepositoryPort')
    private readonly chatRepository: ChatRepositoryPort,
  ) {}

  async execute(input: CreateChatInputDto): Promise<ChatOutput> {
    const chat = Chat.create(input);
    const createdChat = await this.chatRepository.create(chat);
    return ChatMapper.toOutputDto(createdChat);
  }
}
