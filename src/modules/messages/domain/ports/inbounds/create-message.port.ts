import { Message } from "../../entity/message.entity";

export type CreateMessageProps = {
  chatId: string;
  phoneId: string;
  accountId: string;
  authorId?: string;
  externalId: string;
  chatExternalId: string;
  phoneExternalId: string;
  accountExternalId: string;
  authorExternalId?: string;
  waMessageId: string;
  waSenderId: string;
  senderName?: string;
  status: number;
  type: number;
  isOut: boolean;
  ack: number;
  text?: string;
  quotes?: string;
  quotesType?: number;
  quotesWaMessageId?: string;
  quotesThumb?: string;
  file?: any;
  products?: any;
  vcardContacts?: any;
  metadata?: any;
  botResponse?: any;
  watsonResponse?: any;
  errorDetails?: any;
  edits?: any;
  timestamp: Date;
  sendDate?: Date;
};

export interface CreateMessagePort {
  execute(props: CreateMessageProps): Promise<Message>;
}
