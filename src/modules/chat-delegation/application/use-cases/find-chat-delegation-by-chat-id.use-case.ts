import { Inject, Injectable } from '@nestjs/common';
import type { ChatDelegationRepositoryPort } from '../../domain/ports/outbounds/chat-delegation.repository.port';
import type { FindChatDelegationByChatIdPort } from '../../domain/ports/inbounds/find-chat-delegation-by-chat-id.port';
import { ChatDelegationOutput } from '../dtos/chat-delegation.output';
import { ChatDelegationMapper } from '../mappers/chat-delegation-application.mapper';

@Injectable()
export class FindChatDelegationByChatIdUseCase implements FindChatDelegationByChatIdPort {
  constructor(
    @Inject('ChatDelegationRepositoryPort')
    private readonly chatDelegationRepository: ChatDelegationRepositoryPort,
  ) {}

  async execute(chatId: string): Promise<ChatDelegationOutput | null> {
    const chatDelegation = await this.chatDelegationRepository.findChatDelegationByChatId(chatId);
    return chatDelegation ? ChatDelegationMapper.toOutputDto(chatDelegation) : null;
  }
}
