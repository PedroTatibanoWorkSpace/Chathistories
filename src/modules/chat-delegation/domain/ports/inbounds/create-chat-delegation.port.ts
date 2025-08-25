import { ChatDelegation } from "../../entity/chat-delegation.entity";

export type CreateChatDelegationProps = {
  chatId: string;
  userId?: string;
  groupExternalId?: string;
  delegationType: string;
};

export interface CreateChatDelegationPort {
  execute(props: CreateChatDelegationProps): Promise<ChatDelegation>;
}
