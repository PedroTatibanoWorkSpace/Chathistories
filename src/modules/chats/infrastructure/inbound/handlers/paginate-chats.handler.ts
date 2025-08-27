import { Controller, Get, Inject, Query } from '@nestjs/common';

import { PaginateChatsQueryDto } from '../dtos/paginate-chats.query.dto';
import { ChatsResponseDto } from '../dtos/chats-response.dto';
import type { PaginateChatsPort } from 'src/modules/chats/domain/ports/inbounds/paginate-chats.port';
import { PaginatedResult } from 'src/common/domain/pagination/pagination.types';

@Controller('chats')
export class PaginateChatsHandler {
  constructor(
    @Inject('PaginateChatsPort')
    private readonly paginateChatsPort: PaginateChatsPort,
  ) {}

  @Get()
  async handle(
    @Query() query: PaginateChatsQueryDto,
  ): Promise<{ data: PaginatedResult<ChatsResponseDto>; message: string }> {
    const params = {
      page: query.page,
      limit: query.limit,
    };

    const result = await this.paginateChatsPort.execute(query, params);

    return {
      data: result,
      message: 'Chats encontrados com sucesso',
    };
  }
}
