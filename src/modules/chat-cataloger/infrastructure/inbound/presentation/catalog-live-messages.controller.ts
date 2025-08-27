import { Controller, Post, Query, Inject } from '@nestjs/common';
import type { CatalogLiveMessagesPort, CatalogLiveMessagesOptions } from '../../../domain/ports/inbounds/catalog-live-messages.port';

@Controller('catalog-live-messages')
export class CatalogLiveMessagesController {
  constructor(
    @Inject('CatalogLiveMessagesPort')
    private readonly catalogLiveMessagesPort: CatalogLiveMessagesPort,
  ) {}

  @Post()
  async catalogLive(@Query() options: CatalogLiveMessagesOptions) {
    return await this.catalogLiveMessagesPort.execute(options);
  }
}
