export type CreateProps = {
  chatId: string;
  userId?: string;
  groupExternalId?: string;
  delegationType: string;
};

export type ReconstructProps = {
  id: string;
  chatId: string;
  userId?: string;
  groupExternalId?: string;
  delegationType: string;
  createdAt: Date;
};

export type ChatDelegationOutput = {
  id: string;
  chatId: string;
  userId?: string;
  groupExternalId?: string;
  delegationType: string;
  createdAt: Date;
};

export class ChatDelegation {
  constructor(
    public readonly id: string,
    public readonly chatId: string,
    public readonly delegationType: string,
    public readonly createdAt: Date,
    public readonly userId?: string,
    public readonly groupExternalId?: string,
  ) {}

  static create(props: CreateProps): ChatDelegation {
    return new ChatDelegation(
      crypto.randomUUID(),
      props.chatId,
      props.delegationType,

      new Date(),
      props.userId,
      props.groupExternalId,
    );
  }

  static reconstruct(props: ReconstructProps): ChatDelegation {
    return new ChatDelegation(
      props.id,
      props.chatId,
      props.delegationType,
      props.createdAt,
      props.userId,
      props.groupExternalId,
    );
  }
}
