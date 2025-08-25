import { Inject, Injectable } from '@nestjs/common';
import type { ChatFunnelStepRepositoryPort } from '../../domain/ports/outbounds/chat-funnel-step.repository.port';
import type { PaginateChatFunnelStepsPort } from '../../domain/ports/inbounds/paginate-chat-funnel-steps.port';
import { PaginateChatFunnelStepsInputDto } from '../dtos/paginate-chat-funnel-steps-input.dto';
import { ChatFunnelStepOutput } from '../dtos/chat-funnel-step.output';
import { ChatFunnelStepMapper } from '../mappers/chat-funnel-step-application.mapper';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';

@Injectable()
export class PaginateChatFunnelStepsUseCase implements PaginateChatFunnelStepsPort {
  constructor(
    @Inject('ChatFunnelStepRepositoryPort')
    private readonly chatFunnelStepRepository: ChatFunnelStepRepositoryPort,
  ) {}

  async execute(
    input: PaginateChatFunnelStepsInputDto,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<ChatFunnelStepOutput>> {
    const result = await this.chatFunnelStepRepository.paginate(input, params);
    
    return {
      items: result.items.map(ChatFunnelStepMapper.toOutputDto),
      total: result.total,
    };
  }
}
