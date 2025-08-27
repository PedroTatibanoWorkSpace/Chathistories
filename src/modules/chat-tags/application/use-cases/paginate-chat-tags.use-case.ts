import { Inject, Injectable } from '@nestjs/common';
import type { ChatTagRepositoryPort } from '../../domain/ports/outbounds/chat-tag.repository.port';
import type { PaginateChatTagsPort } from '../../domain/ports/inbounds/paginate-chat-tags.port';
import { PaginateChatTagsInputDto } from '../dtos/paginate-chat-tags-input.dto';
import { ChatTagOutput } from '../dtos/chat-tag.output';
import { ChatTagMapper } from '../mappers/chat-tag-application.mapper';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';

@Injectable()
export class PaginateChatTagsUseCase implements PaginateChatTagsPort {
  constructor(
    @Inject('ChatTagRepositoryPort')
    private readonly chatTagRepository: ChatTagRepositoryPort,
  ) {}

  async execute(
    input: PaginateChatTagsInputDto,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<ChatTagOutput>> {
    const result = await this.chatTagRepository.paginate(input, params);
    
    return {
      items: result.items.map(ChatTagMapper.toOutputDto),
      total: result.total,
    };
  }
}
