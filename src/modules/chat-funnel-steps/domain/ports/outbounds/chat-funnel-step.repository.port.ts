import { BaseRepositoryPort } from 'src/common/domain/ports/base-repository.port';
import { ChatFunnelStep } from '../../entity/chat-funnel-step.entity';

export type ChatFunnelStepQuery = {
  chatId?: string;
  funnelStepExternalId?: string;
};

export interface ChatFunnelStepRepositoryPort
  extends BaseRepositoryPort<ChatFunnelStep, ChatFunnelStepQuery> {
  findChatFunnelStepByChatId(chatId: string): Promise<ChatFunnelStep | null>;
  findChatFunnelStepByFunnelStepExternalId(funnelStepExternalId: string): Promise<ChatFunnelStep | null>;
}
