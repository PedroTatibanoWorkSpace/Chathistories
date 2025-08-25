import { Chat } from "../../entity/chat.entity";

export type CreateChatProps = {
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
};

export interface CreateChatPort {
  execute(props: CreateChatProps): Promise<Chat>;
}
