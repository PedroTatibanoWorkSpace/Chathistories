import { Inject, Injectable } from '@nestjs/common';
import type { UserRepositoryPort } from '../../domain/ports/outbounds/user.repository.port';
import { CreateUserInputDto } from '../dtos/create-user-input.dto';
import { User } from '../../domain/entity/user.entity';
import type { CreateUserPort } from '../../domain/ports/inbounds/create-user.port';
import { UserOutput } from '../dtos/user.output';
import { UserMapper } from '../mappers/user-application.mapper';

@Injectable()
export class CreateUserUseCase implements CreateUserPort {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(input: CreateUserInputDto): Promise<UserOutput> {
    const user = User.create(input);
    const createdUser = await this.userRepository.create(user);
    return UserMapper.toOutputDto(createdUser);
  }
}
