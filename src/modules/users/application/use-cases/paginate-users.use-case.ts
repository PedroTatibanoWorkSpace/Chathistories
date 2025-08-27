import { Inject, Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { PaginateUsersInputDto } from '../dtos/paginate-users-input.dto';
import type { UserRepositoryPort } from '../../domain/ports/outbounds/user.repository.port';
import { PaginateUsersPort } from '../../domain/ports/inbounds/paginate-users.port';
import { UserOutput } from '../dtos/user.output';
import { UserMapper } from '../mappers/user-application.mapper';

@Injectable()
export class PaginateUsersUseCase implements PaginateUsersPort {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(
    input: PaginateUsersInputDto,
    params: PaginationParams,
  ): Promise<PaginatedResult<UserOutput>> {
    const { items, total } = await this.userRepository.paginate(
      input,
      params,
    );

    const mapped = items.map((item) => UserMapper.toOutputDto(item));

    return {
      items: mapped,
      total,
    };
  }
}
