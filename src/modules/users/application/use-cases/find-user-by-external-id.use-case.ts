import { Inject, Injectable } from '@nestjs/common';
import type { UserRepositoryPort } from '../../domain/ports/outbounds/user.repository.port';
import type { FindUserByExternalIdPort } from '../../domain/ports/inbounds/find-user-by-external-id.port';
import { UserOutput } from '../dtos/user.output';
import { UserMapper } from '../mappers/user-application.mapper';

@Injectable()
export class FindUserByExternalIdUseCase implements FindUserByExternalIdPort {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(externalId: string): Promise<UserOutput | null> {
    const user = await this.userRepository.findUserByExternalId(externalId);
    return user ? UserMapper.toOutputDto(user) : null;
  }
}
