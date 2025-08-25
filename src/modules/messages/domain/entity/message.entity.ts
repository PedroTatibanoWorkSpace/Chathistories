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

export type ReconstructMessageProps = {
  id: string;
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
  isApproved: boolean;
  type: number;
  isOut: boolean;
  ack: number;
  isTemplate: boolean;
  optionsOpen: boolean;
  deleted: boolean;
  hide: boolean;
  processor: number;
  isForwarded: boolean;
  fromDevice: boolean;
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
  createdAt: Date;
  timestamp: Date;
  sendDate?: Date;
};

export type MessageOutput = {
  id: string;
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
  isApproved: boolean;
  type: number;
  isOut: boolean;
  ack: number;
  isTemplate: boolean;
  optionsOpen: boolean;
  deleted: boolean;
  hide: boolean;
  processor: number;
  isForwarded: boolean;
  fromDevice: boolean;
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
  createdAt: Date;
  timestamp: Date;
  sendDate?: Date;
};

export class Message {
  constructor(
    public readonly id: string,
    public readonly chatId: string,
    public readonly phoneId: string,
    public readonly accountId: string,
    public readonly externalId: string,
    public readonly chatExternalId: string,
    public readonly phoneExternalId: string,
    public readonly accountExternalId: string,
    public readonly waMessageId: string,
    public readonly waSenderId: string,
    public readonly status: number,
    public readonly isApproved: boolean,
    public readonly type: number,
    public readonly isOut: boolean,
    public readonly ack: number,
    public readonly isTemplate: boolean,
    public readonly optionsOpen: boolean,
    public readonly deleted: boolean,
    public readonly hide: boolean,
    public readonly processor: number,
    public readonly isForwarded: boolean,
    public readonly fromDevice: boolean,
    public readonly createdAt: Date,
    public readonly timestamp: Date,
    public readonly sendDate?: Date | undefined,
    public readonly authorId?: string | undefined,
    public readonly authorExternalId?: string | undefined,
    public readonly senderName?: string | undefined,
    public readonly text?: string | undefined,
    public readonly quotes?: string | undefined,
    public readonly quotesType?: number | undefined,
    public readonly quotesWaMessageId?: string | undefined,
    public readonly quotesThumb?: string | undefined,
    public readonly file?: any | undefined,
    public readonly products?: any | undefined,
    public readonly vcardContacts?: any | undefined,
    public readonly metadata?: any | undefined,
    public readonly botResponse?: any | undefined,
    public readonly watsonResponse?: any | undefined,
    public readonly errorDetails?: any | undefined,
    public readonly edits?: any | undefined,
  ) {}

  static create(props: CreateMessageProps): Message {
    return new Message(
      crypto.randomUUID(),
      props.chatId,
      props.phoneId,
      props.accountId,
      props.externalId,
      props.chatExternalId,
      props.phoneExternalId,
      props.accountExternalId,
      props.waMessageId,
      props.waSenderId,
      props.status,
      false,
      props.type,
      props.isOut,
      props.ack,
      false,
      false,
      false,
      false,
      0,
      false,
      false,
      new Date(),
      props.timestamp,
      props.sendDate,
      props.authorId,
      props.authorExternalId,
      props.senderName,
      props.text,
      props.quotes,
      props.quotesType,
      props.quotesWaMessageId,
      props.quotesThumb,
      props.file,
      props.products,
      props.vcardContacts,
      props.metadata,
      props.botResponse,
      props.watsonResponse,
      props.errorDetails,
      props.edits,
    );
  }

  static reconstruct(props: ReconstructMessageProps): Message {
    return new Message(
      props.id,
      props.chatId,
      props.phoneId,
      props.accountId,
      props.externalId,
      props.chatExternalId,
      props.phoneExternalId,
      props.accountExternalId,
      props.waMessageId,
      props.waSenderId,
      props.status,
      props.isApproved,
      props.type,
      props.isOut,
      props.ack,
      props.isTemplate,
      props.optionsOpen,
      props.deleted,
      props.hide,
      props.processor,
      props.isForwarded,
      props.fromDevice,
      props.createdAt,
      props.timestamp,
      props.sendDate,
      props.authorId,
      props.authorExternalId,
      props.senderName,
      props.text,
      props.quotes,
      props.quotesType,
      props.quotesWaMessageId,
      props.quotesThumb,
      props.file,
      props.products,
      props.vcardContacts,
      props.metadata,
      props.botResponse,
      props.watsonResponse,
      props.errorDetails,
      props.edits,
    );
  }
}
