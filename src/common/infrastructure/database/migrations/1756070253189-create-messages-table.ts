import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePartitionedMessages1756070253189
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE messages (
        id UUID DEFAULT gen_random_uuid(),
        
        chat_id UUID NOT NULL,
        phone_id UUID NOT NULL,
        account_id UUID NOT NULL,
        author_id UUID NULL,

        external_id VARCHAR(255) NOT NULL,
        chat_external_id VARCHAR(255) NOT NULL,
        phone_external_id VARCHAR(255) NOT NULL,
        account_external_id VARCHAR(255) NOT NULL,
        author_external_id VARCHAR(255),

        wa_message_id VARCHAR(500) NOT NULL,
        wa_sender_id VARCHAR(255) NOT NULL,

        status SMALLINT NOT NULL,
        is_approved BOOLEAN DEFAULT FALSE,
        type SMALLINT NOT NULL,
        is_out BOOLEAN NOT NULL,
        ack SMALLINT NOT NULL,
        is_template BOOLEAN DEFAULT FALSE,
        options_open BOOLEAN DEFAULT FALSE,
        deleted BOOLEAN DEFAULT FALSE,
        hide BOOLEAN DEFAULT FALSE,
        processor INTEGER DEFAULT 0,
        is_forwarded BOOLEAN DEFAULT FALSE,
        from_device BOOLEAN DEFAULT FALSE,

        text TEXT,
        quotes TEXT,
        quotes_type SMALLINT,
        quotes_wa_message_id VARCHAR(500),

        created_at TIMESTAMPTZ DEFAULT now(),
        timestamp TIMESTAMPTZ NOT NULL,
        send_date TIMESTAMPTZ,

        PRIMARY KEY (id, timestamp)
      ) PARTITION BY RANGE (timestamp);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_messages_external_id ON messages (external_id);
    `);

    await queryRunner.query(`
      CREATE TABLE messages_2025_08 PARTITION OF messages
      FOR VALUES FROM ('2025-08-01') TO ('2025-09-01');
    `);

    await queryRunner.query(`
      CREATE INDEX idx_messages_2025_08_chat_id_timestamp
      ON messages_2025_08 (chat_id, timestamp);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_messages_2025_08_account_id_timestamp
      ON messages_2025_08 (account_id, timestamp);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_messages_2025_08_phone_id_timestamp
      ON messages_2025_08 (phone_id, timestamp);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_messages_2025_08_timestamp
      ON messages_2025_08 (timestamp);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_messages_2025_08_created_at
      ON messages_2025_08 (created_at);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_messages_2025_08_wa_message_id_hash
      ON messages_2025_08 USING HASH (md5(wa_message_id));
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX idx_messages_2025_08_external_id_timestamp
      ON messages_2025_08 (external_id, timestamp);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS messages_2025_08;`);
    await queryRunner.query(`DROP TABLE IF EXISTS messages;`);
  }
}
