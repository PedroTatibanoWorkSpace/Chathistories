import { Inject, Injectable } from '@nestjs/common';
import type { UserRepositoryPort } from '../../domain/ports/outbounds/user.repository.port';
import type { FindUserByIdPort } from '../../domain/ports/inbounds/find-user-by-id.port';
import { UserOutput } from '../dtos/user.output';
import { UserMapper } from '../mappers/user-application.mapper';

@Injectable()
export class FindUserByIdUseCase implements FindUserByIdPort {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(id: string): Promise<UserOutput | null> {
    const user = await this.userRepository.findById(id);
    return user ? UserMapper.toOutputDto(user) : null;
  }
}
