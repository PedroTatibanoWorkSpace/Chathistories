export class ChatDelegationOutput {
  id: string;
  chatId: string;
  userId?: string;
  groupExternalId?: string;
  delegationType: string;
  createdAt: Date;
}
