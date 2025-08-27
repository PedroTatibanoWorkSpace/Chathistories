import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FindOptionsWhere, EntityManager, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { User } from '../../../domain/entity/user.entity';
import {
  UserQuery,
  UserRepositoryPort,
} from '../../../domain/ports/outbounds/user.repository.port';
import { UserOrmEntity } from './orm/user-orm.entity';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class TypeOrmUserRepository implements UserRepositoryPort {
  private readonly userRepository: Repository<UserOrmEntity>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.userRepository = this.entityManager.getRepository(UserOrmEntity);
  }

  async create(user: User): Promise<User> {
    const ormUser = UserMapper.toOrmEntity(user);
    const savedOrmUser = await this.userRepository.save(ormUser);
    return UserMapper.toDomainEntity(savedOrmUser);
  }

  async paginate(
    query: UserQuery,
    params: PaginationParams,
  ): Promise<PaginatedResult<User>> {
    const where: FindOptionsWhere<UserOrmEntity> = {};

    if (query.externalId) {
      where.externalId = query.externalId;
    }

    if (query.accountId) {
      where.accountId = query.accountId;
    }

    const [result, total] = await this.userRepository.findAndCount({
      where,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      order: { createdAt: 'ASC' },
    });

    const items = result.map(UserMapper.toDomainEntity);

    return { items, total };
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.userRepository.findOne({
      where: { id } as FindOptionsWhere<UserOrmEntity>,
    });

    return entity ? UserMapper.toDomainEntity(entity) : null;
  }

  async findUserByExternalId(externalId: string): Promise<User | null> {
    const entity = await this.userRepository.findOne({
      where: { externalId } as FindOptionsWhere<UserOrmEntity>,
    });

    return entity ? UserMapper.toDomainEntity(entity) : null;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = { id, ...user };
    const savedUser = await this.userRepository.save(
      updatedUser as UserOrmEntity,
    );
    return UserMapper.toDomainEntity(savedUser);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected ? true : false;
  }
}
