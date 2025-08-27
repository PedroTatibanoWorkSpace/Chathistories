import { Chat } from "../../entity/chat.entity";

export interface FindChatByIdPort {
  execute(id: string): Promise<Chat | null>;
}
