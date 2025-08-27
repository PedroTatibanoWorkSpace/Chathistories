import { Controller, Post, Get, Inject } from '@nestjs/common';
import type { CatalogLiveMessagesPort } from 'src/modules/chat-cataloger/domain/ports/inbounds/catalog-live-messages.port';

@Controller('catalog-live-messages')
export class CatalogLiveMessagesController {
  constructor(
    @Inject('CatalogLiveMessagesPort')
    private readonly catalogLiveMessagesPort: CatalogLiveMessagesPort,
  ) {}

  @Post('enable-cron')
  enableCron() {
    this.catalogLiveMessagesPort.enableCron();
    return { status: 'enabled' };
  }

  @Post('disable-cron')
  disableCron() {
    this.catalogLiveMessagesPort.disableCron();
    return { status: 'disabled' };
  }

  @Get('cron-status')
  getCronStatus() {
    return { enabled: this.catalogLiveMessagesPort.isCronActive() };
  }
}
