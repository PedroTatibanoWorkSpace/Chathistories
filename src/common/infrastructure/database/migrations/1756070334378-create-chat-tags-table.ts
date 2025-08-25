import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChatTagsTable1756070334378 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chat_tags',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          { name: 'chat_id', type: 'uuid', isNullable: false },
          { name: 'text', type: 'varchar', length: '500', isNullable: false },
          { name: 'color', type: 'varchar', length: '20', isNullable: false },
          {
            name: 'bg_color',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
        ],
        indices: [
          { name: 'IDX_chat_tags_chat_id', columnNames: ['chat_id'] },
          { name: 'IDX_chat_tags_text', columnNames: ['text'] },
        ],
        foreignKeys: [
          {
            name: 'FK_chat_tags_chat_id',
            columnNames: ['chat_id'],
            referencedTableName: 'chats',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chat_tags');
  }
}
