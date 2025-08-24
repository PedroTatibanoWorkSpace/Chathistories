import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChatTagsTable1756070334378 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "chat_tags",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "gen_random_uuid()"
                    },
                    {
                        name: "chat_external_id",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "text",
                        type: "varchar",
                        length: "500",
                        isNullable: false
                    },
                    {
                        name: "color",
                        type: "varchar",
                        length: "20",
                        isNullable: false
                    },
                    {
                        name: "bg_color",
                        type: "varchar",
                        length: "20",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        isNullable: false
                    }
                ],
                indices: [
                    {
                        name: "IDX_chat_tags_chat_external_id",
                        columnNames: ["chat_external_id"]
                    },
                    {
                        name: "IDX_chat_tags_text",
                        columnNames: ["text"]
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_chat_tags_chat_external_id",
                        columnNames: ["chat_external_id"],
                        referencedTableName: "chats",
                        referencedColumnNames: ["external_id"],
                        onDelete: "CASCADE"
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("chat_tags");
    }

}
