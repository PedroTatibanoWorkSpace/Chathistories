export type CreateProps = {
  messageId: string;
  messageTimestamp: Date;
  oldText: string;
  editDate: Date;
};

export type ReconstructProps = {
  id: string;
  messageId: string;
  messageTimestamp: Date;
  oldText: string;
  editDate: Date;
  createdAt: Date;
};

export type MessageEditOutput = {
  id: string;
  messageId: string;
  messageTimestamp: Date;
  oldText: string;
  editDate: Date;
  createdAt: Date;
};

export class MessageEdit {
  constructor(
    public readonly id: string,
    public readonly messageId: string,
    public readonly messageTimestamp: Date,
    public readonly oldText: string,
    public readonly editDate: Date,
    public readonly createdAt: Date,
  ) {}

  static create(props: CreateProps): MessageEdit {
    return new MessageEdit(
      crypto.randomUUID(),
      props.messageId,
      props.messageTimestamp,
      props.oldText,
      props.editDate,
      new Date(),
    );
  }

  static reconstruct(props: ReconstructProps): MessageEdit {
    return new MessageEdit(
      props.id,
      props.messageId,
      props.messageTimestamp,
      props.oldText,
      props.editDate,
      props.createdAt,
    );
  }
}
