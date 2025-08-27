import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FindOptionsWhere, EntityManager, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { Phone } from '../../../domain/entity/phone.entity';
import {
  PhoneQuery,
  PhoneRepositoryPort,
} from '../../../domain/ports/outbounds/phone.repository.port';
import { PhoneOrmEntity } from './orm/phone-orm.entity';
import { PhoneMapper } from './mappers/phone.mapper';

@Injectable()
export class TypeOrmPhoneRepository implements PhoneRepositoryPort {
  private readonly phoneRepository: Repository<PhoneOrmEntity>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.phoneRepository = this.entityManager.getRepository(PhoneOrmEntity);
  }

  async create(phone: Phone): Promise<Phone> {
    const ormPhone = PhoneMapper.toOrmEntity(phone);
    const savedOrmPhone = await this.phoneRepository.save(ormPhone);
    return PhoneMapper.toDomainEntity(savedOrmPhone);
  }

  async paginate(
    query: PhoneQuery,
    params: PaginationParams,
  ): Promise<PaginatedResult<Phone>> {
    const where: FindOptionsWhere<PhoneOrmEntity> = {};

    if (query.externalId) {
      where.externalId = query.externalId;
    }

    if (query.accountId) {
      where.accountId = query.accountId;
    }

    const [result, total] = await this.phoneRepository.findAndCount({
      where,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      order: { createdAt: 'ASC' },
    });

    const items = result.map(PhoneMapper.toDomainEntity);

    return { items, total };
  }

  async findById(id: string): Promise<Phone | null> {
    const entity = await this.phoneRepository.findOne({
      where: { id } as FindOptionsWhere<PhoneOrmEntity>,
    });

    return entity ? PhoneMapper.toDomainEntity(entity) : null;
  }

  async findPhoneByExternalId(externalId: string): Promise<Phone | null> {
    const entity = await this.phoneRepository.findOne({
      where: { externalId } as FindOptionsWhere<PhoneOrmEntity>,
    });

    return entity ? PhoneMapper.toDomainEntity(entity) : null;
  }

  async update(id: string, phone: Partial<Phone>): Promise<Phone> {
    const updatedPhone = { id, ...phone };
    const savedPhone = await this.phoneRepository.save(
      updatedPhone as PhoneOrmEntity,
    );
    return PhoneMapper.toDomainEntity(savedPhone);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.phoneRepository.delete(id);
    return result.affected ? true : false;
  }
}
