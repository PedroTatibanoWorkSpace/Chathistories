import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/infrastructure/database/database.module';
import { ScheduleAppModule } from './common/infrastructure/schedule/schedule.module';
import { AccountModule } from './modules/accounts/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhonesModule } from './modules/phones/phones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    DatabaseModule,
    ScheduleAppModule,
    AccountModule,
    PhonesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
