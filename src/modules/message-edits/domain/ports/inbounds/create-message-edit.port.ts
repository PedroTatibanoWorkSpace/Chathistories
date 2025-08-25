import { MessageEdit } from "../../entity/message-edit.entity";

export type CreateMessageEditProps = {
  messageId: string;
  messageTimestamp: Date;
  oldText: string;
  editDate: Date;
};

export interface CreateMessageEditPort {
  execute(props: CreateMessageEditProps): Promise<MessageEdit>;
}
