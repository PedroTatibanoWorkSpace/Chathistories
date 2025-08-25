import { MessageProduct } from "../../entity/message-product.entity";

export interface FindMessageProductByMessageIdPort {
  execute(messageId: string): Promise<MessageProduct | null>;
}
