import { Inject, Injectable } from '@nestjs/common';
import type { ChatFunnelStepRepositoryPort } from '../../domain/ports/outbounds/chat-funnel-step.repository.port';
import type { FindChatFunnelStepByIdPort } from '../../domain/ports/inbounds/find-chat-funnel-step-by-id.port';
import { ChatFunnelStepOutput } from '../dtos/chat-funnel-step.output';
import { ChatFunnelStepMapper } from '../mappers/chat-funnel-step-application.mapper';

@Injectable()
export class FindChatFunnelStepByIdUseCase implements FindChatFunnelStepByIdPort {
  constructor(
    @Inject('ChatFunnelStepRepositoryPort')
    private readonly chatFunnelStepRepository: ChatFunnelStepRepositoryPort,
  ) {}

  async execute(id: string): Promise<ChatFunnelStepOutput | null> {
    const chatFunnelStep = await this.chatFunnelStepRepository.findById(id);
    return chatFunnelStep ? ChatFunnelStepMapper.toOutputDto(chatFunnelStep) : null;
  }
}
