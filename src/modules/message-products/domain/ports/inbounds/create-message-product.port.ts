import { MessageProduct } from "../../entity/message-product.entity";

export type CreateMessageProductProps = {
  messageId: string;
  productData: Record<string, any>;
};

export interface CreateMessageProductPort {
  execute(props: CreateMessageProductProps): Promise<MessageProduct>;
}
