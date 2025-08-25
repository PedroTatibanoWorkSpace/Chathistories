import { MessageEdit } from '../../domain/entity/message-edit.entity';
import { MessageEditOutput } from '../dtos/message-edit.output';

export class MessageEditMapper {
  static toOutputDto(messageEdit: MessageEdit): MessageEditOutput {
    return {
      id: messageEdit.id,
      messageId: messageEdit.messageId,
      messageTimestamp: messageEdit.messageTimestamp,
      oldText: messageEdit.oldText,
      editDate: messageEdit.editDate,
      createdAt: messageEdit.createdAt,
    };
  }
}
