import { BaseRepositoryPort } from 'src/common/domain/ports/base-repository.port';
import { ChatTag } from '../../entity/chat-tag.entity';

export type ChatTagQuery = {
  chatId?: string;
  text?: string;
};

export interface ChatTagRepositoryPort
  extends BaseRepositoryPort<ChatTag, ChatTagQuery> {
  findChatTagByChatId(chatId: string): Promise<ChatTag | null>;
  findChatTagByText(text: string): Promise<ChatTag | null>;
}
