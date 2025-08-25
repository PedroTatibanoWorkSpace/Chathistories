export type CreateUserProps = {
  externalId: string;
  accountId: string;
};

export type ReconstructUserProps = {
  id: string;
  externalId: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserOutput = {
  id: string;
  externalId: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  constructor(
    public readonly id: string,
    public readonly externalId: string,
    public readonly accountId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(props: CreateUserProps): User {
    return new User(
      crypto.randomUUID(),
      props.externalId,
      props.accountId,
      new Date(),
      new Date(),
    );
  }

  static reconstruct(props: ReconstructUserProps): User {
    return new User(
      props.id,
      props.externalId,
      props.accountId,
      props.createdAt,
      props.updatedAt,
    );
  }
}
