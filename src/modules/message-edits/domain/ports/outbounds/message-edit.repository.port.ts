import { BaseRepositoryPort } from 'src/common/domain/ports/base-repository.port';
import { MessageEdit } from '../../entity/message-edit.entity';

export type MessageEditQuery = {
  messageId?: string;
  messageTimestamp?: Date;
  editDate?: Date;
};

export interface MessageEditRepositoryPort
  extends BaseRepositoryPort<MessageEdit, MessageEditQuery> {
  findMessageEditByMessageId(messageId: string): Promise<MessageEdit | null>;
  findMessageEditsByMessageIdAndTimestamp(messageId: string, messageTimestamp: Date): Promise<MessageEdit[]>;
}
