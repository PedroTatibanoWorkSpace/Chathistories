import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMessagesHypertable1756070253189
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
        sender_name VARCHAR(255),
        
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
        quotes_thumb TEXT,
        
        file JSONB,
        products JSONB,
        vcard_contacts JSONB,
        metadata JSONB,
        bot_response JSONB,
        watson_response JSONB,
        error_details JSONB,
        edits JSONB,
        
        created_at TIMESTAMPTZ DEFAULT now(),
        timestamp TIMESTAMPTZ NOT NULL,
        send_date TIMESTAMPTZ,
        
        PRIMARY KEY (id, timestamp)
      );
    `);

    await queryRunner.query(`
      SELECT create_hypertable('messages', 'timestamp', chunk_time_interval => interval '1 day');
    `);

    await queryRunner.query(
      `CREATE INDEX idx_messages_chat_id ON messages (chat_id);`,
    );
    await queryRunner.query(
      `CREATE INDEX idx_messages_phone_id ON messages (phone_id);`,
    );

    await queryRunner.query(
      `CREATE UNIQUE INDEX idx_messages_wa_message_id ON messages (wa_message_id, timestamp);`,
    );

    await queryRunner.query(
      `CREATE INDEX idx_messages_chat_timestamp ON messages (chat_id, timestamp DESC);`,
    );

    await queryRunner.query(
      `CREATE INDEX idx_messages_account_timestamp ON messages (account_id, timestamp DESC);`,
    );

    await queryRunner.query(`
  ALTER TABLE messages ADD CONSTRAINT fk_messages_chat_id 
  FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE;
`);

    await queryRunner.query(`
  ALTER TABLE messages ADD CONSTRAINT fk_messages_phone_id 
  FOREIGN KEY (phone_id) REFERENCES phones(id) ON DELETE CASCADE;
`);

    await queryRunner.query(`
  ALTER TABLE messages ADD CONSTRAINT fk_messages_account_id 
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE;
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS messages;`);
  }
}
