import { Controller, Post, Query , Inject} from '@nestjs/common';
import type { CatalogHistoryPort } from '../../../domain/ports/inbounds/catalog-history.port';
import type { CatalogHistoryOptions } from '../../../domain/ports/inbounds/catalog-history.port';

@Controller('catalog-history')
export class CatalogHistoryController {
  constructor(
    @Inject('CatalogHistoryPort')
    private readonly catalogHistoryPort: CatalogHistoryPort,
  ) {}

  @Post()
  async catalogHistory(@Query() options: CatalogHistoryOptions) {
    return await this.catalogHistoryPort.execute(options);
  }
}
