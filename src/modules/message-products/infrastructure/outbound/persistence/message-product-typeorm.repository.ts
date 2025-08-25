import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FindOptionsWhere, EntityManager, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { MessageProduct } from '../../../domain/entity/message-product.entity';
import {
  MessageProductQuery,
  MessageProductRepositoryPort,
} from '../../../domain/ports/outbounds/message-product.repository.port';
import { MessageProductOrmEntity } from './orm/message-product-orm.entity';
import { MessageProductMapper } from './mappers/message-product.mapper';

@Injectable()
export class TypeOrmMessageProductRepository implements MessageProductRepositoryPort {
  private readonly messageProductRepository: Repository<MessageProductOrmEntity>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.messageProductRepository = this.entityManager.getRepository(MessageProductOrmEntity);
  }

  async create(messageProduct: MessageProduct): Promise<MessageProduct> {
    const ormMessageProduct = MessageProductMapper.toOrmEntity(messageProduct);
    const savedOrmMessageProduct = await this.messageProductRepository.save(ormMessageProduct);
    return MessageProductMapper.toDomainEntity(savedOrmMessageProduct);
  }

  async paginate(
    query: MessageProductQuery,
    params: PaginationParams,
  ): Promise<PaginatedResult<MessageProduct>> {
    const where: FindOptionsWhere<MessageProductOrmEntity> = {};

    if (query.messageId) {
      where.messageId = query.messageId;
    }

    const [result, total] = await this.messageProductRepository.findAndCount({
      where,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      order: { createdAt: 'ASC' },
    });

    const items = result.map(MessageProductMapper.toDomainEntity);

    return { items, total };
  }

  async findById(id: string): Promise<MessageProduct | null> {
    const entity = await this.messageProductRepository.findOne({
      where: { id } as FindOptionsWhere<MessageProductOrmEntity>,
    });

    return entity ? MessageProductMapper.toDomainEntity(entity) : null;
  }

  async findMessageProductByMessageId(messageId: string): Promise<MessageProduct | null> {
    const entity = await this.messageProductRepository.findOne({
      where: { messageId } as FindOptionsWhere<MessageProductOrmEntity>,
    });

    return entity ? MessageProductMapper.toDomainEntity(entity) : null;
  }

  async update(id: string, messageProduct: Partial<MessageProduct>): Promise<MessageProduct> {
    const updatedMessageProduct = { id, ...messageProduct };
    const savedMessageProduct = await this.messageProductRepository.save(
      updatedMessageProduct as MessageProductOrmEntity,
    );
    return MessageProductMapper.toDomainEntity(savedMessageProduct);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.messageProductRepository.delete(id);
    return result.affected ? true : false;
  }
}
