import { ChatTag } from "../../entity/chat-tag.entity";

export type CreateChatTagProps = {
  chatId: string;
  text: string;
  color: string;
  bgColor: string;
};

export interface CreateChatTagPort {
  execute(props: CreateChatTagProps): Promise<ChatTag>;
}
