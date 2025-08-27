import { ChatTag } from "../../entity/chat-tag.entity";

export interface FindChatTagByIdPort {
  execute(id: string): Promise<ChatTag | null>;
}
