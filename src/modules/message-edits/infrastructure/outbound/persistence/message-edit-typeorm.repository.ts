import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FindOptionsWhere, EntityManager, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { MessageEdit } from '../../../domain/entity/message-edit.entity';
import {
  MessageEditQuery,
  MessageEditRepositoryPort,
} from '../../../domain/ports/outbounds/message-edit.repository.port';
import { MessageEditOrmEntity } from './orm/message-edit-orm.entity';
import { MessageEditMapper } from './mappers/message-edit.mapper';

@Injectable()
export class TypeOrmMessageEditRepository implements MessageEditRepositoryPort {
  private readonly messageEditRepository: Repository<MessageEditOrmEntity>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.messageEditRepository = this.entityManager.getRepository(MessageEditOrmEntity);
  }

  async create(messageEdit: MessageEdit): Promise<MessageEdit> {
    const ormMessageEdit = MessageEditMapper.toOrmEntity(messageEdit);
    const savedOrmMessageEdit = await this.messageEditRepository.save(ormMessageEdit);
    return MessageEditMapper.toDomainEntity(savedOrmMessageEdit);
  }

  async paginate(
    query: MessageEditQuery,
    params: PaginationParams,
  ): Promise<PaginatedResult<MessageEdit>> {
    const where: FindOptionsWhere<MessageEditOrmEntity> = {};

    if (query.messageId) {
      where.messageId = query.messageId;
    }

    if (query.messageTimestamp) {
      where.messageTimestamp = query.messageTimestamp;
    }

    if (query.editDate) {
      where.editDate = query.editDate;
    }

    const [result, total] = await this.messageEditRepository.findAndCount({
      where,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      order: { createdAt: 'ASC' },
    });

    const items = result.map(MessageEditMapper.toDomainEntity);

    return { items, total };
  }

  async findById(id: string): Promise<MessageEdit | null> {
    const entity = await this.messageEditRepository.findOne({
      where: { id } as FindOptionsWhere<MessageEditOrmEntity>,
    });

    return entity ? MessageEditMapper.toDomainEntity(entity) : null;
  }

  async findMessageEditByMessageId(messageId: string): Promise<MessageEdit | null> {
    const entity = await this.messageEditRepository.findOne({
      where: { messageId } as FindOptionsWhere<MessageEditOrmEntity>,
    });

    return entity ? MessageEditMapper.toDomainEntity(entity) : null;
  }

  async findMessageEditsByMessageIdAndTimestamp(messageId: string, messageTimestamp: Date): Promise<MessageEdit[]> {
    const entities = await this.messageEditRepository.find({
      where: { 
        messageId,
        messageTimestamp
      } as FindOptionsWhere<MessageEditOrmEntity>,
    });

    return entities.map(MessageEditMapper.toDomainEntity);
  }

  async update(id: string, messageEdit: Partial<MessageEdit>): Promise<MessageEdit> {
    const updatedMessageEdit = { id, ...messageEdit };
    const savedMessageEdit = await this.messageEditRepository.save(
      updatedMessageEdit as MessageEditOrmEntity,
    );
    return MessageEditMapper.toDomainEntity(savedMessageEdit);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.messageEditRepository.delete(id);
    return result.affected ? true : false;
  }
}
