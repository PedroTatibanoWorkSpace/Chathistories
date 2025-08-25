import { ChatTag } from "../../entity/chat-tag.entity";

export interface FindChatTagByChatIdPort {
  execute(chatId: string): Promise<ChatTag | null>;
}
