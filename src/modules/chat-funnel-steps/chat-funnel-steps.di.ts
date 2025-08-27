import { Provider } from '@nestjs/common';
import { CreateChatFunnelStepUseCase } from './application/use-cases/create-chat-funnel-step.use-case';
import { FindChatFunnelStepByIdUseCase } from './application/use-cases/find-chat-funnel-step-by-id.use-case';
import { FindChatFunnelStepByChatIdUseCase } from './application/use-cases/find-chat-funnel-step-by-chat-id.use-case';
import { PaginateChatFunnelStepsUseCase } from './application/use-cases/paginate-chat-funnel-steps.use-case';
import { TypeOrmChatFunnelStepRepository } from './infrastructure/outbound/persistence/chat-funnel-step-typeorm.repository';

export const ChatFunnelStepsProviders: Provider[] = [
  {
    provide: 'CreateChatFunnelStepPort',
    useClass: CreateChatFunnelStepUseCase,
  },
  {
    provide: 'FindChatFunnelStepByIdPort',
    useClass: FindChatFunnelStepByIdUseCase,
  },
  {
    provide: 'FindChatFunnelStepByChatIdPort',
    useClass: FindChatFunnelStepByChatIdUseCase,
  },
  {
    provide: 'PaginateChatFunnelStepsPort',
    useClass: PaginateChatFunnelStepsUseCase,
  },
  {
    provide: 'ChatFunnelStepRepositoryPort',
    useClass: TypeOrmChatFunnelStepRepository,
  },
];
