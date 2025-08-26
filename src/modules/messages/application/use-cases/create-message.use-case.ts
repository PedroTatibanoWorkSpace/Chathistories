import { Inject, Injectable } from '@nestjs/common';
import type { MessageRepositoryPort } from '../../domain/ports/outbounds/message.repository.port';
import { CreateMessageInputDto } from '../dtos/create-message-input.dto';
import { Message } from '../../domain/entity/message.entity';
import type { CreateMessagePort } from '../../domain/ports/inbounds/create-message.port';
import { MessageOutput } from '../dtos/message.output';
import { MessageMapper } from '../mappers/message-application.mapper';
import type { CreateMessageProductPort } from '../../../message-products/domain/ports/inbounds/create-message-product.port';
import type { CreateMessageEditPort } from '../../../message-edits/domain/ports/inbounds/create-message-edit.port';

@Injectable()
export class CreateMessageUseCase implements CreateMessagePort {
  constructor(
    @Inject('MessageRepositoryPort')
    private readonly messageRepository: MessageRepositoryPort,
    @Inject('CreateMessageProductPort')
    private readonly createMessageProduct: CreateMessageProductPort,
    @Inject('CreateMessageEditPort')
    private readonly createMessageEdit: CreateMessageEditPort,
  ) {}

  async execute(input: CreateMessageInputDto): Promise<MessageOutput> {
    const message = Message.create(input);
    const createdMessage = await this.messageRepository.create(message);

    if (input.products && Object.keys(input.products).length > 0) {
      await this.createMessageProduct.execute({
        messageId: createdMessage.id,
        productData: input.products,
      });
    }

    if (input.edits && Array.isArray(input.edits) && input.edits.length > 0) {
      for (const edit of input.edits) {
        await this.createMessageEdit.execute({
          messageId: createdMessage.id,
          messageTimestamp: edit.messageTimestamp || createdMessage.timestamp,
          oldText: edit.oldText,
          editDate: edit.editDate,
        });
      }
    }

    return MessageMapper.toOutputDto(createdMessage);
  }
}