import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FindOptionsWhere, EntityManager, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { ChatFunnelStep } from '../../../domain/entity/chat-funnel-step.entity';
import {
  ChatFunnelStepQuery,
  ChatFunnelStepRepositoryPort,
} from '../../../domain/ports/outbounds/chat-funnel-step.repository.port';
import { ChatFunnelStepOrmEntity } from './orm/chat-funnel-step-orm.entity';
import { ChatFunnelStepMapper } from './mappers/chat-funnel-step.mapper';

@Injectable()
export class TypeOrmChatFunnelStepRepository implements ChatFunnelStepRepositoryPort {
  private readonly chatFunnelStepRepository: Repository<ChatFunnelStepOrmEntity>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.chatFunnelStepRepository = this.entityManager.getRepository(ChatFunnelStepOrmEntity);
  }

  async create(chatFunnelStep: ChatFunnelStep): Promise<ChatFunnelStep> {
    const ormChatFunnelStep = ChatFunnelStepMapper.toOrmEntity(chatFunnelStep);
    const savedOrmChatFunnelStep = await this.chatFunnelStepRepository.save(ormChatFunnelStep);
    return ChatFunnelStepMapper.toDomainEntity(savedOrmChatFunnelStep);
  }

  async paginate(
    query: ChatFunnelStepQuery,
    params: PaginationParams,
  ): Promise<PaginatedResult<ChatFunnelStep>> {
    const where: FindOptionsWhere<ChatFunnelStepOrmEntity> = {};

    if (query.chatId) {
      where.chatId = query.chatId;
    }

    if (query.funnelStepExternalId) {
      where.funnelStepExternalId = query.funnelStepExternalId;
    }

    const [result, total] = await this.chatFunnelStepRepository.findAndCount({
      where,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      order: { createdAt: 'ASC' },
    });

    const items = result.map(ChatFunnelStepMapper.toDomainEntity);

    return { items, total };
  }

  async findById(id: string): Promise<ChatFunnelStep | null> {
    const entity = await this.chatFunnelStepRepository.findOne({
      where: { id } as FindOptionsWhere<ChatFunnelStepOrmEntity>,
    });

    return entity ? ChatFunnelStepMapper.toDomainEntity(entity) : null;
  }

  async findChatFunnelStepByChatId(chatId: string): Promise<ChatFunnelStep | null> {
    const entity = await this.chatFunnelStepRepository.findOne({
      where: { chatId } as FindOptionsWhere<ChatFunnelStepOrmEntity>,
    });

    return entity ? ChatFunnelStepMapper.toDomainEntity(entity) : null;
  }

  async findChatFunnelStepByFunnelStepExternalId(funnelStepExternalId: string): Promise<ChatFunnelStep | null> {
    const entity = await this.chatFunnelStepRepository.findOne({
      where: { funnelStepExternalId } as FindOptionsWhere<ChatFunnelStepOrmEntity>,
    });

    return entity ? ChatFunnelStepMapper.toDomainEntity(entity) : null;
  }

  async update(id: string, chatFunnelStep: Partial<ChatFunnelStep>): Promise<ChatFunnelStep> {
    const updatedChatFunnelStep = { id, ...chatFunnelStep };
    const savedChatFunnelStep = await this.chatFunnelStepRepository.save(
      updatedChatFunnelStep as ChatFunnelStepOrmEntity,
    );
    return ChatFunnelStepMapper.toDomainEntity(savedChatFunnelStep);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.chatFunnelStepRepository.delete(id);
    return result.affected ? true : false;
  }
}
