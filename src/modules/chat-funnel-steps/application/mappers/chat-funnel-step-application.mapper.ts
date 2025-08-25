import { ChatFunnelStep } from '../../domain/entity/chat-funnel-step.entity';
import { ChatFunnelStepOutput } from '../dtos/chat-funnel-step.output';

export class ChatFunnelStepMapper {
  static toOutputDto(chatFunnelStep: ChatFunnelStep): ChatFunnelStepOutput {
    return {
      id: chatFunnelStep.id,
      chatId: chatFunnelStep.chatId,
      funnelStepExternalId: chatFunnelStep.funnelStepExternalId,
      createdAt: chatFunnelStep.createdAt,
    };
  }
}
