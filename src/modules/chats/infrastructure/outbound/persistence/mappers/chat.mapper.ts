import { Chat } from 'src/modules/chats/domain/entity/chat.entity';
import { ChatOrmEntity } from '../orm/chat-orm.entity';

export class ChatMapper {
  static toOrmEntity(domainChat: Chat): ChatOrmEntity {
    return {
      id: domainChat.id,
      externalId: domainChat.externalId,
      phoneId: domainChat.phoneId,
      accountId: domainChat.accountId,
      waChatId: domainChat.waChatId,
      name: domainChat.name,
      kind: domainChat.kind,
      picture: domainChat.picture,
      status: domainChat.status,
      favorite: domainChat.favorite,
      archived: domainChat.archived,
      scheduled: domainChat.scheduled,
      newMessages: domainChat.newMessages,
      createdAt: domainChat.createdAt,
      updatedAt: domainChat.updatedAt,
    };
  }

  static toDomainEntity(ormChat: ChatOrmEntity): Chat {
    return Chat.reconstruct({
      id: ormChat.id,
      externalId: ormChat.externalId,
      phoneId: ormChat.phoneId,
      accountId: ormChat.accountId,
      waChatId: ormChat.waChatId,
      name: ormChat.name,
      kind: ormChat.kind,
      picture: ormChat.picture,
      status: ormChat.status,
      favorite: ormChat.favorite,
      archived: ormChat.archived,
      scheduled: ormChat.scheduled,
      newMessages: ormChat.newMessages,
      createdAt: ormChat.createdAt,
      updatedAt: ormChat.updatedAt,
    });
  }
}
