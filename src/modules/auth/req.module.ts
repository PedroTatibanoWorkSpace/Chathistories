import { Module } from '@nestjs/common';
import { ChatGuruReqService } from './services/chat-guru-req.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [ChatGuruReqService],
  exports: [ChatGuruReqService]
})
export class AuthModule {}
