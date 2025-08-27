import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FindOptionsWhere, EntityManager, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { Account } from '../../../domain/entity/account.entity';
import {
  AccountQuery,
  AccountRepositoryPort,
} from '../../../domain/ports/outbounds/account.repository.port';
import { AccountOrmEntity } from './orm/account-orm.entity';
import { AccountMapper } from './mappers/account.mapper';

@Injectable()
export class TypeOrmAccountRepository implements AccountRepositoryPort {
  private readonly accountRepository: Repository<AccountOrmEntity>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.accountRepository = this.entityManager.getRepository(AccountOrmEntity);
  }

  async create(account: Account): Promise<Account> {
    const ormAccount = AccountMapper.toOrmEntity(account);
    const savedOrmAccount = await this.accountRepository.save(ormAccount);
    return AccountMapper.toDomainEntity(savedOrmAccount);
  }

  async paginate(
    query: AccountQuery,
    params: PaginationParams,
  ): Promise<PaginatedResult<Account>> {
    const where: FindOptionsWhere<AccountOrmEntity> = {};

    if (query.externalId) {
      where.externalId = query.externalId;
    }

    const [result, total] = await this.accountRepository.findAndCount({
      where,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      order: { createdAt: 'ASC' },
    });

    const items = result.map(AccountMapper.toDomainEntity);

    return { items, total };
  }

  async findById(id: string): Promise<Account | null> {
    const entity = await this.accountRepository.findOne({
      where: { id } as FindOptionsWhere<AccountOrmEntity>,
    });

    return entity ? AccountMapper.toDomainEntity(entity) : null;
  }

  async findAccountByExternalId(externalId: string): Promise<Account | null> {
    const entity = await this.accountRepository.findOne({
      where: { externalId } as FindOptionsWhere<AccountOrmEntity>,
    });

    return entity ? AccountMapper.toDomainEntity(entity) : null;
  }

  async update(id: string, account: Partial<Account>): Promise<Account> {
    const updatedAccount = { id, ...account };
    const savedAccount = await this.accountRepository.save(
      updatedAccount as AccountOrmEntity,
    );
    return AccountMapper.toDomainEntity(savedAccount);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.accountRepository.delete(id);
    return result.affected ? true : false;
  }
}
