export type CreateProps = {
  chatId: string;
  text: string;
  color: string;
  bgColor: string;
};

export type ReconstructProps = {
  id: string;
  chatId: string;
  text: string;
  color: string;
  bgColor: string;
  createdAt: Date;
};

export type ChatTagOutput = {
  id: string;
  chatId: string;
  text: string;
  color: string;
  bgColor: string;
  createdAt: Date;
};

export class ChatTag {
  constructor(
    public readonly id: string,
    public readonly chatId: string,
    public readonly text: string,
    public readonly color: string,
    public readonly bgColor: string,
    public readonly createdAt: Date,
  ) {}

  static create(props: CreateProps): ChatTag {
    return new ChatTag(
      crypto.randomUUID(),
      props.chatId,
      props.text,
      props.color,
      props.bgColor,
      new Date(),
    );
  }

  static reconstruct(props: ReconstructProps): ChatTag {
    return new ChatTag(
      props.id,
      props.chatId,
      props.text,
      props.color,
      props.bgColor,
      props.createdAt,
    );
  }
}
