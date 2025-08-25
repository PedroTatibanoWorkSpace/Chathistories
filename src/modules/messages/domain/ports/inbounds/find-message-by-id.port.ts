import { Message } from "../../entity/message.entity";

export interface FindMessageByIdPort {
  execute(id: string): Promise<Message | null>;
}
