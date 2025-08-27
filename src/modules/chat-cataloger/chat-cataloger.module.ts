import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatCatalogerProviders } from './chat-cataloger.di';
import { AccountModule } from '../accounts/account.module';
import { UsersModule } from '../users/users.module';
import { ChatsModule } from '../chats/chats.module';
import { MessagesModule } from '../messages/messages.module';
import { ChatDelegationModule } from '../chat-delegation/chat-delegation.module';
import { PhonesModule } from '../phones/phones.module';
import { ChatFunnelStepsModule } from '../chat-funnel-steps/chat-funnel-steps.module';
import { ChatTagsModule } from '../chat-tags/chat-tags.module';
import { CatalogHistoryController } from './presentation/catalog-history.controller';
import { AccountService } from './application/services/account.service';
import { PhoneService } from './application/services/phone.service';
import { UserService } from './application/services/user.service';
import { ChatService } from './application/services/chat.service';
import { MessageService } from './application/services/message.service';
import { HelpersService } from './application/services/helpers.service';
import { ChatDelegationsService } from './application/services/chat-delegations.service';
import { ChatFunnelStepsService } from './application/services/chat-funnel-steps.service';
import { ChatTagsService } from './application/services/chat-tags.service';

@Module({
  imports: [
    ConfigModule,
    AccountModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
    ChatDelegationModule,
    PhonesModule,
    ChatFunnelStepsModule,
    ChatTagsModule,
  ],
  controllers: [CatalogHistoryController],
  providers: [
    ...ChatCatalogerProviders,
    AccountService,
    PhoneService,
    UserService,
    ChatService,
    MessageService,
    HelpersService,
    ChatDelegationsService,
    ChatFunnelStepsService,
    ChatTagsService,
  ],
  exports: ['CatalogHistoryPort', 'ChatGuruRequestPort'],
})
export class ChatCatalogerModule {}
