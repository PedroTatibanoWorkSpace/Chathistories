import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/infrastructure/database/database.module';
import { AccountModule } from './modules/accounts/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhonesModule } from './modules/phones/phones.module';
import { ChatsModule } from './modules/chats/chats.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ChatFunnelStepsModule } from './modules/chat-funnel-steps/chat-funnel-steps.module';
import { ChatTagsModule } from './modules/chat-tags/chat-tags.module';
import { ChatDelegationModule } from './modules/chat-delegation/chat-delegation.module';
import { UsersModule } from './modules/users/users.module';
import { ChatCatalogerModule } from './modules/chat-cataloger/chat-cataloger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    DatabaseModule,
    AccountModule,
    PhonesModule,
    ChatsModule,
    MessagesModule,
    ChatDelegationModule,
    ChatFunnelStepsModule,
    ChatTagsModule,
    UsersModule,
    ChatCatalogerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
