import { Inject, Injectable } from '@nestjs/common';
import type { ChatFunnelStepRepositoryPort } from '../../domain/ports/outbounds/chat-funnel-step.repository.port';
import { CreateChatFunnelStepInputDto } from '../dtos/create-chat-funnel-step-input.dto';
import { ChatFunnelStep } from '../../domain/entity/chat-funnel-step.entity';
import type { CreateChatFunnelStepPort } from '../../domain/ports/inbounds/create-chat-funnel-step.port';
import { ChatFunnelStepOutput } from '../dtos/chat-funnel-step.output';
import { ChatFunnelStepMapper } from '../mappers/chat-funnel-step-application.mapper';

@Injectable()
export class CreateChatFunnelStepUseCase implements CreateChatFunnelStepPort {
  constructor(
    @Inject('ChatFunnelStepRepositoryPort')
    private readonly chatFunnelStepRepository: ChatFunnelStepRepositoryPort,
  ) {}

  async execute(input: CreateChatFunnelStepInputDto): Promise<ChatFunnelStepOutput> {
    const chatFunnelStep = ChatFunnelStep.create(input);
    const createdChatFunnelStep = await this.chatFunnelStepRepository.create(chatFunnelStep);
    return ChatFunnelStepMapper.toOutputDto(createdChatFunnelStep);
  }
}
