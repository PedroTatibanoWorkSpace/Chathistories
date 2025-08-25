import { Inject, Injectable } from '@nestjs/common';
import type { MessageEditRepositoryPort } from '../../domain/ports/outbounds/message-edit.repository.port';
import type { PaginateMessageEditsPort } from '../../domain/ports/inbounds/paginate-message-edits.port';
import { PaginateMessageEditsInputDto } from '../dtos/paginate-message-edits-input.dto';
import { MessageEditOutput } from '../dtos/message-edit.output';
import { MessageEditMapper } from '../mappers/message-edit-application.mapper';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';

@Injectable()
export class PaginateMessageEditsUseCase implements PaginateMessageEditsPort {
  constructor(
    @Inject('MessageEditRepositoryPort')
    private readonly messageEditRepository: MessageEditRepositoryPort,
  ) {}

  async execute(
    input: PaginateMessageEditsInputDto,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<MessageEditOutput>> {
    const result = await this.messageEditRepository.paginate(input, params);
    
    return {
      items: result.items.map(MessageEditMapper.toOutputDto),
      total: result.total,
    };
  }
}
