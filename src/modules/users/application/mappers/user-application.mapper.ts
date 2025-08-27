import { User } from '../../domain/entity/user.entity';
import { UserOutput } from '../dtos/user.output';

export class UserMapper {
  static toOutputDto(user: User): UserOutput {
    return {
      id: user.id,
      externalId: user.externalId,
      accountId: user.accountId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
