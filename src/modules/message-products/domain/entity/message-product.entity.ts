export type CreateProps = {
  messageId: string;
  productData: Record<string, any>;
};

export type ReconstructProps = {
  id: string;
  messageId: string;
  productData: Record<string, any>;
  createdAt: Date;
};

export type MessageProductOutput = {
  id: string;
  messageId: string;
  productData: Record<string, any>;
  createdAt: Date;
};

export class MessageProduct {
  constructor(
    public readonly id: string,
    public readonly messageId: string,
    public readonly productData: Record<string, any>,
    public readonly createdAt: Date,
  ) {}

  static create(props: CreateProps): MessageProduct {
    return new MessageProduct(
      crypto.randomUUID(),
      props.messageId,
      props.productData,
      new Date(),
    );
  }

  static reconstruct(props: ReconstructProps): MessageProduct {
    return new MessageProduct(
      props.id,
      props.messageId,
      props.productData,
      props.createdAt,
    );
  }
}
