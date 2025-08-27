import { Provider } from '@nestjs/common';
import { CatalogHistoryUseCase } from './application/use-cases/catalog-history.use-case';
import { ChatGuruRequestService } from './infrastructure/outbound/chatguru-request.service';
import { CatalogLiveMessagesUseCase } from './application/use-cases/catalog-live-messages.use-case';

export const ChatCatalogerProviders: Provider[] = [
  {
    provide: 'CatalogHistoryPort',
    useClass: CatalogHistoryUseCase,
  },
  {
    provide: 'ChatGuruRequestPort',
    useClass: ChatGuruRequestService,
  },
  {
    provide: 'CatalogLiveMessagesPort',
    useClass: CatalogLiveMessagesUseCase,
  },
];
