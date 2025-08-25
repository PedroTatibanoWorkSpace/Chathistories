import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMessageEditsTable1756073530979
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'message_edits',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          { name: 'message_id', type: 'uuid', isNullable: false },
          { name: 'message_timestamp', type: 'timestamptz', isNullable: false },
          { name: 'old_text', type: 'text', isNullable: false },
          { name: 'edit_date', type: 'timestamptz', isNullable: false },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
        ],
        indices: [
          {
            name: 'IDX_message_edits_message_id_timestamp',
            columnNames: ['message_id', 'message_timestamp', 'edit_date'],
          },
        ],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('message_edits');
  }
}
   