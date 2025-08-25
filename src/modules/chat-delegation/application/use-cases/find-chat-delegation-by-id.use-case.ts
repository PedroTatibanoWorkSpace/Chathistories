import { Inject, Injectable } from '@nestjs/common';
import type { ChatDelegationRepositoryPort } from '../../domain/ports/outbounds/chat-delegation.repository.port';
import type { FindChatDelegationByIdPort } from '../../domain/ports/inbounds/find-chat-delegation-by-id.port';
import { ChatDelegationOutput } from '../dtos/chat-delegation.output';
import { ChatDelegationMapper } from '../mappers/chat-delegation-application.mapper';

@Injectable()
export class FindChatDelegationByIdUseCase implements FindChatDelegationByIdPort {
  constructor(
    @Inject('ChatDelegationRepositoryPort')
    private readonly chatDelegationRepository: ChatDelegationRepositoryPort,
  ) {}

  async execute(id: string): Promise<ChatDelegationOutput | null> {
    const chatDelegation = await this.chatDelegationRepository.findById(id);
    return chatDelegation ? ChatDelegationMapper.toOutputDto(chatDelegation) : null;
  }
}
