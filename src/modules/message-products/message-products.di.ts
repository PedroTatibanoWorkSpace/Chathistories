import { Provider } from '@nestjs/common';
import { CreateMessageProductUseCase } from './application/use-cases/create-message-product.use-case';
import { FindMessageProductByIdUseCase } from './application/use-cases/find-message-product-by-id.use-case';
import { FindMessageProductByMessageIdUseCase } from './application/use-cases/find-message-product-by-message-id.use-case';
import { PaginateMessageProductsUseCase } from './application/use-cases/paginate-message-products.use-case';
import { TypeOrmMessageProductRepository } from './infrastructure/outbound/persistence/message-product-typeorm.repository';

export const MessageProductsProviders: Provider[] = [
  {
    provide: 'CreateMessageProductPort',
    useClass: CreateMessageProductUseCase,
  },
  {
    provide: 'FindMessageProductByIdPort',
    useClass: FindMessageProductByIdUseCase,
  },
  {
    provide: 'FindMessageProductByMessageIdPort',
    useClass: FindMessageProductByMessageIdUseCase,
  },
  {
    provide: 'PaginateMessageProductsPort',
    useClass: PaginateMessageProductsUseCase,
  },
  {
    provide: 'MessageProductRepositoryPort',
    useClass: TypeOrmMessageProductRepository,
  },
];
