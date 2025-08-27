export class PaginateMessagesInputDto {
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
}
