import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/infrastructure/database/database.module';
import { ScheduleAppModule } from './common/infrastructure/schedule/schedule.module';
import { AccountModule } from './modules/accounts/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhonesModule } from './modules/phones/phones.module';
import { ChatsModule } from './modules/chats/chats.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ChatDelegation } from './modules/chat-delegation/domain/entity/chat-delegation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    DatabaseModule,
    ScheduleAppModule,
    AccountModule,
    PhonesModule,
    ChatsModule,
    MessagesModule,
    ChatDelegation
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
