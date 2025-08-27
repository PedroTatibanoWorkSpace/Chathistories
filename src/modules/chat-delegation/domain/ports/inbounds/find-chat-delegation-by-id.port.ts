import { ChatDelegation } from "../../entity/chat-delegation.entity";

export interface FindChatDelegationByIdPort {
  execute(id: string): Promise<ChatDelegation | null>;
}
