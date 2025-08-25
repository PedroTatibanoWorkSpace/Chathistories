export class CreateChatInputDto {
  externalId: string;
  phoneId: string;
  accountId: string;
  waChatId: string;
  name: string;
  kind: string;
  picture?: string;
  status: number;
  favorite?: boolean;
  archived?: boolean;
  scheduled?: boolean;
  newMessages?: number;
}
