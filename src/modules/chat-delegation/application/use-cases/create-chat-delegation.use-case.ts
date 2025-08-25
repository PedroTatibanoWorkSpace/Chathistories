import { Inject, Injectable } from '@nestjs/common';
import type { ChatDelegationRepositoryPort } from '../../domain/ports/outbounds/chat-delegation.repository.port';
import { CreateChatDelegationInputDto } from '../dtos/create-chat-delegation-input.dto';
import { ChatDelegation } from '../../domain/entity/chat-delegation.entity';
import type { CreateChatDelegationPort } from '../../domain/ports/inbounds/create-chat-delegation.port';
import { ChatDelegationOutput } from '../dtos/chat-delegation.output';
import { ChatDelegationMapper } from '../mappers/chat-delegation-application.mapper';

@Injectable()
export class CreateChatDelegationUseCase implements CreateChatDelegationPort {
  constructor(
    @Inject('ChatDelegationRepositoryPort')
    private readonly chatDelegationRepository: ChatDelegationRepositoryPort,
  ) {}

  async execute(input: CreateChatDelegationInputDto): Promise<ChatDelegationOutput> {
    const chatDelegation = ChatDelegation.create(input);
    const createdChatDelegation = await this.chatDelegationRepository.create(chatDelegation);
    return ChatDelegationMapper.toOutputDto(createdChatDelegation);
  }
}
