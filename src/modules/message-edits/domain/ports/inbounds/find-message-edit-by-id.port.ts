import { MessageEdit } from "../../entity/message-edit.entity";

export interface FindMessageEditByIdPort {
  execute(id: string): Promise<MessageEdit | null>;
}
