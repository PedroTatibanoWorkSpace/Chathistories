import { ChatFunnelStep } from 'src/modules/chat-funnel-steps/domain/entity/chat-funnel-step.entity';
import { ChatFunnelStepOrmEntity } from '../orm/chat-funnel-step-orm.entity';

export class ChatFunnelStepMapper {
  static toOrmEntity(domainChatFunnelStep: ChatFunnelStep): ChatFunnelStepOrmEntity {
    return {
      id: domainChatFunnelStep.id,
      chatId: domainChatFunnelStep.chatId,
      funnelStepExternalId: domainChatFunnelStep.funnelStepExternalId,
      createdAt: domainChatFunnelStep.createdAt,
    };
  }

  static toDomainEntity(ormChatFunnelStep: ChatFunnelStepOrmEntity): ChatFunnelStep {
    return ChatFunnelStep.reconstruct({
      id: ormChatFunnelStep.id,
      chatId: ormChatFunnelStep.chatId,
      funnelStepExternalId: ormChatFunnelStep.funnelStepExternalId,
      createdAt: ormChatFunnelStep.createdAt,
    });
  }
}
