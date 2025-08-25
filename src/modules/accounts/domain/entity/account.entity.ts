export type CreateProps = {
  externalId: string;
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
    return new Account(
      crypto.randomUUID(),
      props.externalId,
      new Date(),
      new Date(),
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
