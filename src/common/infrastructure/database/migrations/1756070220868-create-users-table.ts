import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1756070220868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "gen_random_uuid()"
                    },
                    {
                        name: "external_id",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "account_external_id",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        isNullable: false
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                        isNullable: false
                    }
                ],
                indices: [
                    {
                        name: "IDX_users_external_id",
                        columnNames: ["external_id"]
                    },
                    {
                        name: "IDX_users_account_external_id",
                        columnNames: ["account_external_id"]
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_users_account_external_id",
                        columnNames: ["account_external_id"],
                        referencedTableName: "accounts",
                        referencedColumnNames: ["external_id"],
                        onDelete: "CASCADE"
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
