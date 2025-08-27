export class PaginateChatsInputDto {
  externalId?: string;
  phoneId?: string;
  accountId?: string;
  waChatId?: string;
  phone?: string;
  status?: number;
  favorite?: boolean;
  archived?: boolean;
  scheduled?: boolean;
}
