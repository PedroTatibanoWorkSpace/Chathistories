import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FindOptionsWhere, EntityManager, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { Chat } from '../../../domain/entity/chat.entity';
import {
  ChatQuery,
  ChatRepositoryPort,
} from '../../../domain/ports/outbounds/chat.repository.port';
import { ChatOrmEntity } from './orm/chat-orm.entity';
import { ChatMapper } from './mappers/chat.mapper';

@Injectable()
export class TypeOrmChatRepository implements ChatRepositoryPort {
  private readonly chatRepository: Repository<ChatOrmEntity>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.chatRepository = this.entityManager.getRepository(ChatOrmEntity);
  }

  async create(chat: Chat): Promise<Chat> {
    const ormChat = ChatMapper.toOrmEntity(chat);
    const savedOrmChat = await this.chatRepository.save(ormChat);
    return ChatMapper.toDomainEntity(savedOrmChat);
  }

  async paginate(
    query: ChatQuery,
    params: PaginationParams,
  ): Promise<PaginatedResult<Chat>> {
    const where: FindOptionsWhere<ChatOrmEntity> = {};

    if (query.externalId) {
      where.externalId = query.externalId;
    }

    if (query.phoneId) {
      where.phoneId = query.phoneId;
    }

    if (query.accountId) {
      where.accountId = query.accountId;
    }

    if (query.waChatId) {
      where.waChatId = query.waChatId;
    }

    if (query.status !== undefined) {
      where.status = query.status;
    }

    if (query.favorite !== undefined) {
      where.favorite = query.favorite;
    }

    if (query.archived !== undefined) {
      where.archived = query.archived;
    }

    if (query.scheduled !== undefined) {
      where.scheduled = query.scheduled;
    }

    const [result, total] = await this.chatRepository.findAndCount({
      where,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      order: { createdAt: 'ASC' },
    });

    const items = result.map(ChatMapper.toDomainEntity);

    return { items, total };
  }

  async findById(id: string): Promise<Chat | null> {
    const entity = await this.chatRepository.findOne({
      where: { id } as FindOptionsWhere<ChatOrmEntity>,
    });

    return entity ? ChatMapper.toDomainEntity(entity) : null;
  }

  async findChatByExternalId(externalId: string): Promise<Chat | null> {
    const entity = await this.chatRepository.findOne({
      where: { externalId } as FindOptionsWhere<ChatOrmEntity>,
    });

    return entity ? ChatMapper.toDomainEntity(entity) : null;
  }

  async findChatByWaChatId(waChatId: string): Promise<Chat | null> {
    const entity = await this.chatRepository.findOne({
      where: { waChatId } as FindOptionsWhere<ChatOrmEntity>,
    });

    return entity ? ChatMapper.toDomainEntity(entity) : null;
  }

  async update(id: string, chat: Partial<Chat>): Promise<Chat> {
    const updatedChat = { id, ...chat };
    const savedChat = await this.chatRepository.save(
      updatedChat as ChatOrmEntity,
    );
    return ChatMapper.toDomainEntity(savedChat);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.chatRepository.delete(id);
    return result.affected ? true : false;
  }
}
