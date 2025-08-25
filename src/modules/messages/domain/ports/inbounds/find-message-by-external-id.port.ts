import { Message } from "../../entity/message.entity";

export interface FindMessageByExternalIdPort {
  execute(externalId: string): Promise<Message | null>;
}
