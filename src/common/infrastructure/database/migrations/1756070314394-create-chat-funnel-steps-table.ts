import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChatFunnelStepsTable1756070314394
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chat_funnel_steps',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          { name: 'chat_id', type: 'uuid', isNullable: false },
          {
            name: 'funnel_step_external_id',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
        ],
        indices: [
          { name: 'IDX_chat_funnel_steps_chat_id', columnNames: ['chat_id'] },
          {
            name: 'IDX_chat_funnel_steps_funnel_step_external_id',
            columnNames: ['funnel_step_external_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_chat_funnel_steps_chat_id',
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
    await queryRunner.dropTable('chat_funnel_steps');
  }
}
