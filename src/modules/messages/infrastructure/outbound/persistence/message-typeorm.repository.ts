import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FindOptionsWhere, EntityManager, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { Message } from '../../../domain/entity/message.entity';
import {
  MessageQuery,
  MessageRepositoryPort,
} from '../../../domain/ports/outbounds/message.repository.port';
import { MessageOrmEntity } from './orm/message-orm.entity';
import { MessageMapper } from './mappers/message.mapper';

@Injectable()
export class TypeOrmMessageRepository implements MessageRepositoryPort {
  private readonly messageRepository: Repository<MessageOrmEntity>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.messageRepository = this.entityManager.getRepository(MessageOrmEntity);
  }

  async create(message: Message): Promise<Message> {
    const ormMessage = MessageMapper.toOrmEntity(message);
    const savedOrmMessage = await this.messageRepository.save(ormMessage);
    return MessageMapper.toDomainEntity(savedOrmMessage);
  }

  async paginate(
    query: MessageQuery,
    params: PaginationParams,
  ): Promise<PaginatedResult<Message>> {
    const where: FindOptionsWhere<MessageOrmEntity> = {};

    if (query.chatId) {
      where.chatId = query.chatId;
    }
    if (query.phoneId) {
      where.phoneId = query.phoneId;
    }
    if (query.accountId) {
      where.accountId = query.accountId;
    }
    if (query.authorId) {
      where.authorId = query.authorId;
    }
    if (query.externalId) {
      where.externalId = query.externalId;
    }
    if (query.waMessageId) {
      where.waMessageId = query.waMessageId;
    }
    if (query.status !== undefined) {
      where.status = query.status;
    }
    if (query.type !== undefined) {
      where.type = query.type;
    }
    if (query.isOut !== undefined) {
      where.isOut = query.isOut;
    }
    if (query.deleted !== undefined) {
      where.deleted = query.deleted;
    }

    const [result, total] = await this.messageRepository.findAndCount({
      where,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      order: { timestamp: 'DESC' },
    });

    const items = result.map(MessageMapper.toDomainEntity);

    return { items, total };
  }

  async findById(id: string): Promise<Message | null> {
    const entity = await this.messageRepository.findOne({
      where: { id } as FindOptionsWhere<MessageOrmEntity>,
    });

    return entity ? MessageMapper.toDomainEntity(entity) : null;
  }

  async findMessageByExternalId(externalId: string): Promise<Message | null> {
    const entity = await this.messageRepository.findOne({
      where: { externalId } as FindOptionsWhere<MessageOrmEntity>,
    });

    return entity ? MessageMapper.toDomainEntity(entity) : null;
  }

  async findMessageByWaMessageId(waMessageId: string): Promise<Message | null> {
    const entity = await this.messageRepository.findOne({
      where: { waMessageId } as FindOptionsWhere<MessageOrmEntity>,
    });

    return entity ? MessageMapper.toDomainEntity(entity) : null;
  }

  async update(id: string, message: Partial<Message>): Promise<Message> {
    const updatedMessage = { id, ...message };
    const savedMessage = await this.messageRepository.save(
      updatedMessage as MessageOrmEntity,
    );
    return MessageMapper.toDomainEntity(savedMessage);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.messageRepository.delete(id);
    return result.affected ? true : false;
  }
}
