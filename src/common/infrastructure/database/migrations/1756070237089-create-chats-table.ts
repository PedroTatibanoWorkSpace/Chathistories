import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChatsTable1756070237089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chats',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          { name: 'phone_id', type: 'uuid', isNullable: false },
          { name: 'account_id', type: 'uuid', isNullable: false },
          { name: 'wa_chat_id', type: 'varchar', length: '255' },
          { name: 'name', type: 'varchar', length: '500' },
          { name: 'kind', type: 'varchar', length: '50' },
          { name: 'picture', type: 'text', isNullable: true },
          { name: 'status', type: 'smallint' },
          { name: 'favorite', type: 'boolean', default: false },
          { name: 'archived', type: 'boolean', default: false },
          { name: 'scheduled', type: 'boolean', default: false },
          { name: 'new_messages', type: 'integer', default: 0 },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
        indices: [
          { name: 'IDX_chats_external_id', columnNames: ['external_id'] },
          {
            name: 'IDX_chats_phone_id_updated_at',
            columnNames: ['phone_id', 'updated_at'],
          },
          {
            name: 'IDX_chats_account_id_status',
            columnNames: ['account_id', 'status'],
          },
          { name: 'IDX_chats_wa_chat_id', columnNames: ['wa_chat_id'] },
        ],
        foreignKeys: [
          {
            name: 'FK_chats_phone_id',
            columnNames: ['phone_id'],
            referencedTableName: 'phones',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_chats_account_id',
            columnNames: ['account_id'],
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chats');
  }
}
