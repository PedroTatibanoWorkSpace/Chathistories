export class CreateChatDelegationInputDto {
  chatId: string;
  userId?: string;
  groupExternalId?: string;
  delegationType: string;
}
