import { Provider } from '@nestjs/common';
import { CatalogHistoryUseCase } from './application/use-cases/catalog-history.use-case';
import { ChatGuruRequestService } from './infrastructure/outbound/chatguru-request.service';

export const ChatCatalogerProviders: Provider[] = [
  {
    provide: 'CatalogHistoryPort',
    useClass: CatalogHistoryUseCase,
  },
  {
    provide: 'ChatGuruRequestPort',
    useClass: ChatGuruRequestService,
  },
];
