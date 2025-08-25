import { ChatTag } from '../../domain/entity/chat-tag.entity';
import { ChatTagOutput } from '../dtos/chat-tag.output';

export class ChatTagMapper {
  static toOutputDto(chatTag: ChatTag): ChatTagOutput {
    return {
      id: chatTag.id,
      chatId: chatTag.chatId,
      text: chatTag.text,
      color: chatTag.color,
      bgColor: chatTag.bgColor,
      createdAt: chatTag.createdAt,
    };
  }
}
