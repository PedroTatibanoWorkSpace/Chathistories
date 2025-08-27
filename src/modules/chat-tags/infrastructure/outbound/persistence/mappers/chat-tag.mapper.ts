import { ChatTag } from 'src/modules/chat-tags/domain/entity/chat-tag.entity';
import { ChatTagOrmEntity } from '../orm/chat-tag-orm.entity';

export class ChatTagMapper {
  static toOrmEntity(domainChatTag: ChatTag): ChatTagOrmEntity {
    return {
      id: domainChatTag.id,
      chatId: domainChatTag.chatId,
      text: domainChatTag.text,
      color: domainChatTag.color,
      bgColor: domainChatTag.bgColor,
      createdAt: domainChatTag.createdAt,
    };
  }

  static toDomainEntity(ormChatTag: ChatTagOrmEntity): ChatTag {
    return ChatTag.reconstruct({
      id: ormChatTag.id,
      chatId: ormChatTag.chatId,
      text: ormChatTag.text,
      color: ormChatTag.color,
      bgColor: ormChatTag.bgColor,
      createdAt: ormChatTag.createdAt,
    });
  }
}
