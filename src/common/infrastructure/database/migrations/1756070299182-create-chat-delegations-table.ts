import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChatDelegationsTable1756070299182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chat_delegations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          { name: 'chat_id', type: 'uuid', isNullable: false },
          { name: 'user_id', type: 'uuid', isNullable: true },
          {
            name: 'group_external_id',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'delegation_type',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
        ],
        indices: [
          { name: 'IDX_chat_delegations_chat_id', columnNames: ['chat_id'] },
          { name: 'IDX_chat_delegations_user_id', columnNames: ['user_id'] },
          {
            name: 'IDX_chat_delegations_group_external_id',
            columnNames: ['group_external_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_chat_delegations_chat_id',
            columnNames: ['chat_id'],
            referencedTableName: 'chats',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_chat_delegations_user_id',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chat_delegations');
  }
}
