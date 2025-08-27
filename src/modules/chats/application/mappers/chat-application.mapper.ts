import { Chat } from '../../domain/entity/chat.entity';
import { ChatOutput } from '../dtos/chat.output';

export class ChatMapper {
  static toOutputDto(chat: Chat): ChatOutput {
    return {
      id: chat.id,
      externalId: chat.externalId,
      phoneId: chat.phoneId,
      accountId: chat.accountId,
      waChatId: chat.waChatId,
      name: chat.name,
      kind: chat.kind,
      picture: chat.picture,
      status: chat.status,
      favorite: chat.favorite,
      archived: chat.archived,
      scheduled: chat.scheduled,
      newMessages: chat.newMessages,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    };
  }
}
