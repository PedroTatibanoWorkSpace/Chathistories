export type CreateChatProps = {
  externalId: string;
  phoneId: string;
  accountId: string;
  waChatId: string;
  name: string;
  kind: string;
  picture?: string;
  status: number;
  favorite?: boolean;
  archived?: boolean;
  scheduled?: boolean;
  newMessages?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ReconstructChatProps = {
  id: string;
  externalId: string;
  phoneId: string;
  accountId: string;
  waChatId: string;
  name: string;
  kind: string;
  picture?: string;
  status: number;
  favorite: boolean;
  archived: boolean;
  scheduled: boolean;
  newMessages: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ChatOutput = {
  id: string;
  externalId: string;
  phoneId: string;
  accountId: string;
  waChatId: string;
  name: string;
  kind: string;
  picture?: string;
  status: number;
  favorite: boolean;
  archived: boolean;
  scheduled: boolean;
  newMessages: number;
  createdAt: Date;
  updatedAt: Date;
};

export class Chat {
  constructor(
    public readonly id: string,
    public readonly externalId: string,
    public readonly phoneId: string,
    public readonly accountId: string,
    public readonly waChatId: string,
    public readonly name: string,
    public readonly kind: string,

    public readonly status: number,
    public readonly favorite: boolean,
    public readonly archived: boolean,
    public readonly scheduled: boolean,
    public readonly newMessages: number,
    public readonly createdAt: Date,

    public updatedAt: Date,
    public readonly picture?: string | undefined,
  ) {}

  static create(props: CreateChatProps): Chat {
    const now = new Date();
    return new Chat(
      crypto.randomUUID(),
      props.externalId,
      props.phoneId,
      props.accountId,
      props.waChatId,
      props.name,
      props.kind,
      props.status,
      props.favorite ?? false,
      props.archived ?? false,
      props.scheduled ?? false,
      props.newMessages ?? 0,
      props.createdAt || now,
      props.updatedAt || now,
      props.picture,
    );
  }

  static reconstruct(props: ReconstructChatProps): Chat {
    return new Chat(
      props.id,
      props.externalId,
      props.phoneId,
      props.accountId,
      props.waChatId,
      props.name,
      props.kind,
      props.status,
      props.favorite,
      props.archived,
      props.scheduled,
      props.newMessages,
      props.createdAt,
      props.updatedAt,
      props.picture,
    );
  }
}
