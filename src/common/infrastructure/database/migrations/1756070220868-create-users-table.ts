import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1756070220868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
          { name: 'account_id', type: 'uuid', isNullable: false },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
        indices: [
          { name: 'IDX_users_external_id', columnNames: ['external_id'] },
          { name: 'IDX_users_account_id', columnNames: ['account_id'] },
        ],
        foreignKeys: [
          {
            name: 'FK_users_account_id',
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
    await queryRunner.dropTable('users');
  }
}
