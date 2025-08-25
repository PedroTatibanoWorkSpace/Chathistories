import { MessageProduct } from "../../entity/message-product.entity";

export interface FindMessageProductByIdPort {
  execute(id: string): Promise<MessageProduct | null>;
}
