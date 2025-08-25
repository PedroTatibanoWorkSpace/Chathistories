import { Inject, Injectable } from '@nestjs/common';
import type { ChatDelegationRepositoryPort } from '../../domain/ports/outbounds/chat-delegation.repository.port';
import type { PaginateChatDelegationsPort } from '../../domain/ports/inbounds/paginate-chat-delegations.port';
import { PaginateChatDelegationsInputDto } from '../dtos/paginate-chat-delegations-input.dto';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { ChatDelegationOutput } from '../dtos/chat-delegation.output';
import { ChatDelegationMapper } from '../mappers/chat-delegation-application.mapper';

@Injectable()
export class PaginateChatDelegationsUseCase implements PaginateChatDelegationsPort {
  constructor(
    @Inject('ChatDelegationRepositoryPort')
    private readonly chatDelegationRepository: ChatDelegationRepositoryPort,
  ) {}

  async execute(
    input: PaginateChatDelegationsInputDto,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<ChatDelegationOutput>> {
    const result = await this.chatDelegationRepository.paginate(input, params);
    
    return {
      items: result.items.map(ChatDelegationMapper.toOutputDto),
      total: result.total,
    };
  }
}
