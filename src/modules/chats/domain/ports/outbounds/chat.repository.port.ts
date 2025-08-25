import { BaseRepositoryPort } from 'src/common/domain/ports/base-repository.port';
import { Chat } from '../../entity/chat.entity';

export type ChatQuery = {
  externalId?: string;
  phoneId?: string;
  accountId?: string;
  waChatId?: string;
  status?: number;
  favorite?: boolean;
  archived?: boolean;
  scheduled?: boolean;
};

export interface ChatRepositoryPort
  extends BaseRepositoryPort<Chat, ChatQuery> {
  findChatByExternalId(externalId: string): Promise<Chat | null>;
  findChatByWaChatId(waChatId: string): Promise<Chat | null>;
}
