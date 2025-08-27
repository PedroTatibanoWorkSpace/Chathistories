import { Inject, Injectable } from '@nestjs/common';
import type { ChatRepositoryPort } from '../../domain/ports/outbounds/chat.repository.port';
import type { PaginateChatsPort } from '../../domain/ports/inbounds/paginate-chats.port';
import { PaginateChatsInputDto } from '../dtos/paginate-chats-input.dto';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { ChatMapper } from '../mappers/chat-application.mapper';
import { ChatOutput } from '../dtos/chat.output';

@Injectable()
export class PaginateChatsUseCase implements PaginateChatsPort {
  constructor(
    @Inject('ChatRepositoryPort')
    private readonly chatRepository: ChatRepositoryPort,
  ) {}

  async execute(
    input: PaginateChatsInputDto,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<ChatOutput>> {
    if (input.phone) {
      input.waChatId = input.phone;
      input.phoneId = undefined;
    }
    const result = await this.chatRepository.paginate(input, params);
    return {
      items: result.items.map((chat) => ChatMapper.toOutputDto(chat)),
      total: result.total,
    };
  }
}
