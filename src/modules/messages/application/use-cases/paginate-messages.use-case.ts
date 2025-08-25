import { Inject, Injectable } from '@nestjs/common';
import type { MessageRepositoryPort } from '../../domain/ports/outbounds/message.repository.port';
import type { PaginateMessagesPort } from '../../domain/ports/inbounds/paginate-messages.port';
import { PaginateMessagesInputDto } from '../dtos/paginate-messages-input.dto';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { MessageOutput } from '../dtos/message.output';
import { MessageMapper } from '../mappers/message-application.mapper';

@Injectable()
export class PaginateMessagesUseCase implements PaginateMessagesPort {
  constructor(
    @Inject('MessageRepositoryPort')
    private readonly messageRepository: MessageRepositoryPort,
  ) {}

  async execute(
    input: PaginateMessagesInputDto,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<MessageOutput>> {
    const result = await this.messageRepository.paginate(input, params);
    
    const items = result.items.map(MessageMapper.toOutputDto);
    
    return { items, total: result.total };
  }
}
