import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ChatData } from '../../domain/ports/outbounds/chatguru-request.port';
import { ChatService } from './chat.service';
import type { CreateChatFunnelStepPort } from 'src/modules/chat-funnel-steps/domain/ports/inbounds/create-chat-funnel-step.port';

@Injectable()
export class ChatFunnelStepsService {
  constructor(
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
    @Inject('CreateChatFunnelStepPort')
    private readonly createChatFunnelStepPort: CreateChatFunnelStepPort,
  ) {}

  async processChatFunnelSteps(chatData: ChatData): Promise<void> {
    const chatId = await this.chatService.ensureChatExists(chatData);

    for (const funnelStepExternalId of chatData.funnel_steps_ids) {
      await this.createChatFunnelStepPort.execute({
        chatId: chatId,
        funnelStepExternalId: funnelStepExternalId,
      });
    }
  }
}
