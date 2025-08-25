import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { PartitionService } from "./services/partition.service";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [PartitionService],
})
export class ScheduleAppModule {}