import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';

@Injectable()
export class PartitionService {
  private readonly logger = new Logger(PartitionService.name);

  constructor(private readonly dataSource: DataSource) {}

  @Cron('0 3 28 * *')
  async createNextPartition() {
    this.logger.log('Verificando próxima partição de messages...');

    await this.dataSource.query(`
      DO $$
      DECLARE
          next_month_start date := date_trunc('month', now() + interval '1 month');
          next_month_end date := next_month_start + interval '1 month';
          partition_name text := 'messages_' || to_char(next_month_start, 'YYYY_MM');
      BEGIN
          IF NOT EXISTS (
              SELECT 1
              FROM pg_class c
              JOIN pg_namespace n ON n.oid = c.relnamespace
              WHERE c.relkind = 'r'
              AND c.relname = partition_name
          ) THEN
              EXECUTE format('
                  CREATE TABLE %I PARTITION OF messages
                  FOR VALUES FROM (%L) TO (%L);
              ', partition_name, next_month_start, next_month_end);

              EXECUTE format('
                  CREATE INDEX %I_timestamp ON %I (timestamp);
              ', partition_name, partition_name);

              EXECUTE format('
                  CREATE INDEX %I_created_at ON %I (created_at);
              ', partition_name, partition_name);

              EXECUTE format('
                  CREATE INDEX %I_wa_message_id_hash ON %I USING HASH (md5(wa_message_id));
              ', partition_name, partition_name);
          END IF;
      END$$;
    `);

    this.logger.log('Partição do próximo mês criada (se não existia).');
  }
}
