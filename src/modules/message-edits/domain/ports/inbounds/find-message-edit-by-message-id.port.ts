import { MessageEdit } from "../../entity/message-edit.entity";

export interface FindMessageEditByMessageIdPort {
  execute(messageId: string): Promise<MessageEdit | null>;
}
