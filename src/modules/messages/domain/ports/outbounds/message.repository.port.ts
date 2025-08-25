import { BaseRepositoryPort } from 'src/common/domain/ports/base-repository.port';
import { Message } from '../../entity/message.entity';

export type MessageQuery = {
  chatId?: string;
  phoneId?: string;
  accountId?: string;
  authorId?: string;
  externalId?: string;
  waMessageId?: string;
  status?: number;
  type?: number;
  isOut?: boolean;
  deleted?: boolean;
  timestampFrom?: Date;
  timestampTo?: Date;
};

export interface MessageRepositoryPort
  extends BaseRepositoryPort<Message, MessageQuery> {
  findMessageByExternalId(externalId: string): Promise<Message | null>;
  findMessageByWaMessageId(waMessageId: string): Promise<Message | null>;
  createMany(messages: Message[]): Promise<Message[]>;
}
