import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FindOptionsWhere, EntityManager, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { ChatDelegation } from '../../../domain/entity/chat-delegation.entity';
import {
  ChatDelegationQuery,
  ChatDelegationRepositoryPort,
} from '../../../domain/ports/outbounds/chat-delegation.repository.port';
import { ChatDelegationOrmEntity } from './orm/chat-delegation-orm.entity';
import { ChatDelegationMapper } from './mappers/chat-delegation.mapper';

@Injectable()
export class TypeOrmChatDelegationRepository implements ChatDelegationRepositoryPort {
  private readonly chatDelegationRepository: Repository<ChatDelegationOrmEntity>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.chatDelegationRepository = this.entityManager.getRepository(ChatDelegationOrmEntity);
  }

  async create(chatDelegation: ChatDelegation): Promise<ChatDelegation> {
    const ormChatDelegation = ChatDelegationMapper.toOrmEntity(chatDelegation);
    const savedOrmChatDelegation = await this.chatDelegationRepository.save(ormChatDelegation);
    return ChatDelegationMapper.toDomainEntity(savedOrmChatDelegation);
  }

  async paginate(
    query: ChatDelegationQuery,
    params: PaginationParams,
  ): Promise<PaginatedResult<ChatDelegation>> {
    const where: FindOptionsWhere<ChatDelegationOrmEntity> = {};

    if (query.chatId) {
      where.chatId = query.chatId;
    }
    if (query.userId) {
      where.userId = query.userId;
    }
    if (query.groupExternalId) {
      where.groupExternalId = query.groupExternalId;
    }
    if (query.delegationType) {
      where.delegationType = query.delegationType;
    }

    const [result, total] = await this.chatDelegationRepository.findAndCount({
      where,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      order: { createdAt: 'ASC' },
    });

    const items = result.map(ChatDelegationMapper.toDomainEntity);

    return { items, total };
  }

  async findById(id: string): Promise<ChatDelegation | null> {
    const entity = await this.chatDelegationRepository.findOne({
      where: { id } as FindOptionsWhere<ChatDelegationOrmEntity>,
    });

    return entity ? ChatDelegationMapper.toDomainEntity(entity) : null;
  }

  async findChatDelegationByChatId(chatId: string): Promise<ChatDelegation | null> {
    const entity = await this.chatDelegationRepository.findOne({
      where: { chatId } as FindOptionsWhere<ChatDelegationOrmEntity>,
    });

    return entity ? ChatDelegationMapper.toDomainEntity(entity) : null;
  }

  async update(id: string, chatDelegation: Partial<ChatDelegation>): Promise<ChatDelegation> {
    const updatedChatDelegation = { id, ...chatDelegation };
    const savedChatDelegation = await this.chatDelegationRepository.save(
      updatedChatDelegation as ChatDelegationOrmEntity,
    );
    return ChatDelegationMapper.toDomainEntity(savedChatDelegation);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.chatDelegationRepository.delete(id);
    return result.affected ? true : false;
  }
}
