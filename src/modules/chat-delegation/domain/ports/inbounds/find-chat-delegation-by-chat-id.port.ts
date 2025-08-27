import { ChatDelegation } from "../../entity/chat-delegation.entity";

export interface FindChatDelegationByChatIdPort {
  execute(chatId: string): Promise<ChatDelegation | null>;
}
