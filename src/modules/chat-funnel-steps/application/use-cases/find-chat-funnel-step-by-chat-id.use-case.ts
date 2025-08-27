import { Inject, Injectable } from '@nestjs/common';
import type { ChatFunnelStepRepositoryPort } from '../../domain/ports/outbounds/chat-funnel-step.repository.port';
import type { FindChatFunnelStepByChatIdPort } from '../../domain/ports/inbounds/find-chat-funnel-step-by-chat-id.port';
import { ChatFunnelStepOutput } from '../dtos/chat-funnel-step.output';
import { ChatFunnelStepMapper } from '../mappers/chat-funnel-step-application.mapper';

@Injectable()
export class FindChatFunnelStepByChatIdUseCase implements FindChatFunnelStepByChatIdPort {
  constructor(
    @Inject('ChatFunnelStepRepositoryPort')
    private readonly chatFunnelStepRepository: ChatFunnelStepRepositoryPort,
  ) {}

  async execute(chatId: string): Promise<ChatFunnelStepOutput | null> {
    const chatFunnelStep = await this.chatFunnelStepRepository.findChatFunnelStepByChatId(chatId);
    return chatFunnelStep ? ChatFunnelStepMapper.toOutputDto(chatFunnelStep) : null;
  }
}
