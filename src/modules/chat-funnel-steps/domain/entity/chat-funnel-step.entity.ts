export type CreateProps = {
  chatId: string;
  funnelStepExternalId: string;
};

export type ReconstructProps = {
  id: string;
  chatId: string;
  funnelStepExternalId: string;
  createdAt: Date;
};

export type ChatFunnelStepOutput = {
  id: string;
  chatId: string;
  funnelStepExternalId: string;
  createdAt: Date;
};

export class ChatFunnelStep {
  constructor(
    public readonly id: string,
    public readonly chatId: string,
    public readonly funnelStepExternalId: string,
    public readonly createdAt: Date,
  ) {}

  static create(props: CreateProps): ChatFunnelStep {
    return new ChatFunnelStep(
      crypto.randomUUID(),
      props.chatId,
      props.funnelStepExternalId,
      new Date(),
    );
  }

  static reconstruct(props: ReconstructProps): ChatFunnelStep {
    return new ChatFunnelStep(
      props.id,
      props.chatId,
      props.funnelStepExternalId,
      props.createdAt,
    );
  }
}
