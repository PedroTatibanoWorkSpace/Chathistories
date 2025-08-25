import { ChatFunnelStep } from "../../entity/chat-funnel-step.entity";

export interface FindChatFunnelStepByIdPort {
  execute(id: string): Promise<ChatFunnelStep | null>;
}
