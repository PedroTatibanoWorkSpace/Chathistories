import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMessageProductsTable1756070370192
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'message_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          { name: 'message_id', type: 'uuid', isNullable: false },
          { name: 'product_data', type: 'jsonb', isNullable: false },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
        ],
        indices: [
          {
            name: 'IDX_message_products_message_id',
            columnNames: ['message_id'],
          },
        ],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('message_products');
  }
}
