import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatFunnelStepOrmEntity } from './infrastructure/outbound/persistence/orm/chat-funnel-step-orm.entity';
import { ChatFunnelStepsProviders } from './chat-funnel-steps.di';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatFunnelStepOrmEntity]),
  ],
  providers: [
    ...ChatFunnelStepsProviders,
  ],
  exports: [
    'CreateChatFunnelStepPort',
    'FindChatFunnelStepByIdPort',
    'FindChatFunnelStepByChatIdPort',
    'PaginateChatFunnelStepsPort',
    'ChatFunnelStepRepositoryPort',
  ],
})
export class ChatFunnelStepsModule {}
