import { ChatFunnelStep } from '../../entity/chat-funnel-step.entity';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';
import { ChatFunnelStepQuery } from '../outbounds/chat-funnel-step.repository.port';

export interface PaginateChatFunnelStepsPort {
  execute(
    input: ChatFunnelStepQuery,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<ChatFunnelStep>>;
}
