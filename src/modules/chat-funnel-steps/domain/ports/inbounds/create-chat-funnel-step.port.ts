import { ChatFunnelStep } from "../../entity/chat-funnel-step.entity";

export type CreateChatFunnelStepProps = {
  chatId: string;
  funnelStepExternalId: string;
};

export interface CreateChatFunnelStepPort {
  execute(props: CreateChatFunnelStepProps): Promise<ChatFunnelStep>;
}
