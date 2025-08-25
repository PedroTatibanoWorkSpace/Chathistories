import { Chat } from "../../entity/chat.entity";

export interface FindChatByExternalIdPort {
  execute(externalId: string): Promise<Chat | null>;
}
