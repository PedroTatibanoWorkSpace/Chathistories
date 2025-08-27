import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FindOptionsWhere, EntityManager, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/domain/pagination/pagination.types';
import { ChatTag } from '../../../domain/entity/chat-tag.entity';
import {
  ChatTagQuery,
  ChatTagRepositoryPort,
} from '../../../domain/ports/outbounds/chat-tag.repository.port';
import { ChatTagOrmEntity } from './orm/chat-tag-orm.entity';
import { ChatTagMapper } from './mappers/chat-tag.mapper';

@Injectable()
export class TypeOrmChatTagRepository implements ChatTagRepositoryPort {
  private readonly chatTagRepository: Repository<ChatTagOrmEntity>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.chatTagRepository = this.entityManager.getRepository(ChatTagOrmEntity);
  }

  async create(chatTag: ChatTag): Promise<ChatTag> {
    const ormChatTag = ChatTagMapper.toOrmEntity(chatTag);
    const savedOrmChatTag = await this.chatTagRepository.save(ormChatTag);
    return ChatTagMapper.toDomainEntity(savedOrmChatTag);
  }

  async paginate(
    query: ChatTagQuery,
    params: PaginationParams,
  ): Promise<PaginatedResult<ChatTag>> {
    const where: FindOptionsWhere<ChatTagOrmEntity> = {};

    if (query.chatId) {
      where.chatId = query.chatId;
    }

    if (query.text) {
      where.text = query.text;
    }

    const [result, total] = await this.chatTagRepository.findAndCount({
      where,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      order: { createdAt: 'ASC' },
    });

    const items = result.map(ChatTagMapper.toDomainEntity);

    return { items, total };
  }

  async findById(id: string): Promise<ChatTag | null> {
    const entity = await this.chatTagRepository.findOne({
      where: { id } as FindOptionsWhere<ChatTagOrmEntity>,
    });

    return entity ? ChatTagMapper.toDomainEntity(entity) : null;
  }

  async findChatTagByChatId(chatId: string): Promise<ChatTag | null> {
    const entity = await this.chatTagRepository.findOne({
      where: { chatId } as FindOptionsWhere<ChatTagOrmEntity>,
    });

    return entity ? ChatTagMapper.toDomainEntity(entity) : null;
  }

  async findChatTagByText(text: string): Promise<ChatTag | null> {
    const entity = await this.chatTagRepository.findOne({
      where: { text } as FindOptionsWhere<ChatTagOrmEntity>,
    });

    return entity ? ChatTagMapper.toDomainEntity(entity) : null;
  }

  async update(id: string, chatTag: Partial<ChatTag>): Promise<ChatTag> {
    const updatedChatTag = { id, ...chatTag };
    const savedChatTag = await this.chatTagRepository.save(
      updatedChatTag as ChatTagOrmEntity,
    );
    return ChatTagMapper.toDomainEntity(savedChatTag);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.chatTagRepository.delete(id);
    return result.affected ? true : false;
  }
}
