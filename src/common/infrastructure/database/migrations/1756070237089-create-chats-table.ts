import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChatsTable1756070237089 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "chats",
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
                        name: "phone_external_id",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "account_external_id",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "wa_chat_id",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "500",
                        isNullable: false
                    },
                    {
                        name: "kind",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                    {
                        name: "picture",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "status",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "favorite",
                        type: "boolean",
                        default: false,
                        isNullable: false
                    },
                    {
                        name: "archived",
                        type: "boolean",
                        default: false,
                        isNullable: false
                    },
                    {
                        name: "scheduled",
                        type: "boolean",
                        default: false,
                        isNullable: false
                    },
                    {
                        name: "new_messages",
                        type: "integer",
                        default: 0,
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
                        name: "IDX_chats_external_id",
                        columnNames: ["external_id"]
                    },
                    {
                        name: "IDX_chats_phone_external_id_updated_at",
                        columnNames: ["phone_external_id", "updated_at"]
                    },
                    {
                        name: "IDX_chats_account_external_id_status",
                        columnNames: ["account_external_id", "status"]
                    },
                    {
                        name: "IDX_chats_wa_chat_id",
                        columnNames: ["wa_chat_id"]
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_chats_phone_external_id",
                        columnNames: ["phone_external_id"],
                        referencedTableName: "phones",
                        referencedColumnNames: ["external_id"],
                        onDelete: "CASCADE"
                    },
                    {
                        name: "FK_chats_account_external_id",
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
        await queryRunner.dropTable("chats");
    }

}
