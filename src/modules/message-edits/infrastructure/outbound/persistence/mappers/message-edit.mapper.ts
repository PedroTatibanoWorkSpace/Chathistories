import { MessageEdit } from 'src/modules/message-edits/domain/entity/message-edit.entity';
import { MessageEditOrmEntity } from '../orm/message-edit-orm.entity';

export class MessageEditMapper {
  static toOrmEntity(domainMessageEdit: MessageEdit): MessageEditOrmEntity {
    return {
      id: domainMessageEdit.id,
      messageId: domainMessageEdit.messageId,
      messageTimestamp: domainMessageEdit.messageTimestamp,
      oldText: domainMessageEdit.oldText,
      editDate: domainMessageEdit.editDate,
      createdAt: domainMessageEdit.createdAt,
    };
  }

  static toDomainEntity(ormMessageEdit: MessageEditOrmEntity): MessageEdit {
    return MessageEdit.reconstruct({
      id: ormMessageEdit.id,
      messageId: ormMessageEdit.messageId,
      messageTimestamp: ormMessageEdit.messageTimestamp,
      oldText: ormMessageEdit.oldText,
      editDate: ormMessageEdit.editDate,
      createdAt: ormMessageEdit.createdAt,
    });
  }
}
