export type CreateProps = {
  externalId: string;
  accountId: string;
};

export type ReconstructProps = {
  id: string;
  externalId: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PhoneOutput = {
  id: string;
  externalId: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Phone {
  constructor(
    public readonly id: string,
    public readonly externalId: string,
    public readonly accountId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(props: CreateProps): Phone {
    return new Phone(
      crypto.randomUUID(),
      props.externalId,
      props.accountId,
      new Date(),
      new Date(),
    );
  }

  static reconstruct(props: ReconstructProps): Phone {
    return new Phone(
      props.id,
      props.externalId,
      props.accountId,
      props.createdAt,
      props.updatedAt,
    );
  }
}
