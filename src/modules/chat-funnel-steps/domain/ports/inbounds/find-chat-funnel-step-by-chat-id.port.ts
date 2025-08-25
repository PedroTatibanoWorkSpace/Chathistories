import { ChatFunnelStep } from "../../entity/chat-funnel-step.entity";

export interface FindChatFunnelStepByChatIdPort {
  execute(chatId: string): Promise<ChatFunnelStep | null>;
}
