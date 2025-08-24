import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessagesTable1756070253189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "messages",
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
                        name: "chat_external_id",
                        type: "varchar",
                        length: "255",
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
                        name: "author_external_id",
                        type: "varchar",
                        length: "255",
                        isNullable: true
                    },
                    {
                        name: "wa_message_id",
                        type: "varchar",
                        length: "500",
                        isNullable: false
                    },
                    {
                        name: "wa_sender_id",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "status",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                    {
                        name: "is_approved",
                        type: "boolean",
                        default: false,
                        isNullable: false
                    },
                    {
                        name: "type",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                    {
                        name: "is_out",
                        type: "boolean",
                        isNullable: false
                    },
                    {
                        name: "ack",
                        type: "integer",
                        isNullable: false
                    },
                    {
                        name: "text",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "quotes",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "quotes_type",
                        type: "varchar",
                        length: "50",
                        isNullable: true
                    },
                    {
                        name: "quotes_wa_message_id",
                        type: "varchar",
                        length: "500",
                        isNullable: true
                    },
                    {
                        name: "options_open",
                        type: "boolean",
                        default: false,
                        isNullable: false
                    },
                    {
                        name: "is_template",
                        type: "boolean",
                        default: false,
                        isNullable: false
                    },
                    {
                        name: "deleted",
                        type: "boolean",
                        default: false,
                        isNullable: false
                    },
                    {
                        name: "hide",
                        type: "boolean",
                        default: false,
                        isNullable: false
                    },
                    {
                        name: "processor",
                        type: "integer",
                        default: 0,
                        isNullable: false
                    },
                    {
                        name: "is_forwarded",
                        type: "boolean",
                        default: false,
                        isNullable: false
                    },
                    {
                        name: "from_device",
                        type: "boolean",
                        default: false,
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false
                    },
                    {
                        name: "timestamp",
                        type: "timestamp",
                        isNullable: false
                    },
                    {
                        name: "send_date",
                        type: "timestamp",
                        isNullable: false
                    }
                ],
                indices: [
                    {
                        name: "IDX_messages_external_id",
                        columnNames: ["external_id"]
                    },
                    {
                        name: "IDX_messages_phone_external_id_timestamp",
                        columnNames: ["phone_external_id", "timestamp"]
                    },
                    {
                        name: "IDX_messages_chat_external_id_timestamp",
                        columnNames: ["chat_external_id", "timestamp"]
                    },
                    {
                        name: "IDX_messages_account_external_id_timestamp",
                        columnNames: ["account_external_id", "timestamp"]
                    },
                    {
                        name: "IDX_messages_timestamp",
                        columnNames: ["timestamp"]
                    },
                    {
                        name: "IDX_messages_wa_message_id",
                        columnNames: ["wa_message_id"]
                    },
                    {
                        name: "IDX_messages_created_at",
                        columnNames: ["created_at"]
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_messages_chat_external_id",
                        columnNames: ["chat_external_id"],
                        referencedTableName: "chats",
                        referencedColumnNames: ["external_id"],
                        onDelete: "CASCADE"
                    },
                    {
                        name: "FK_messages_phone_external_id",
                        columnNames: ["phone_external_id"],
                        referencedTableName: "phones",
                        referencedColumnNames: ["external_id"],
                        onDelete: "CASCADE"
                    },
                    {
                        name: "FK_messages_account_external_id",
                        columnNames: ["account_external_id"],
                        referencedTableName: "accounts",
                        referencedColumnNames: ["external_id"],
                        onDelete: "CASCADE"
                    },
                    {
                        name: "FK_messages_author_external_id",
                        columnNames: ["author_external_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["external_id"],
                        onDelete: "SET NULL"
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("messages");
    }

}
