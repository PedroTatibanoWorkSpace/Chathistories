export type CreateProps = {
  externalId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ReconstructProps = {
  id: string;
  externalId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountOutput = {
  id: string;
  externalId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Account {
  constructor(
    public readonly id: string,
    public externalId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(props: CreateProps): Account {
    const now = new Date();
    return new Account(
      crypto.randomUUID(),
      props.externalId,
      props.createdAt || now,
      props.updatedAt || now,
    );
  }

  static reconstruct(props: ReconstructProps): Account {
    return new Account(
      props.id,
      props.externalId,
      props.createdAt,
      props.updatedAt,
    );
  }
}
