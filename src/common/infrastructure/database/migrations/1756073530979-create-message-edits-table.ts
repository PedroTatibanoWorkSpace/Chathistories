import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessageEditsTable1756073530979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "message_edits",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "gen_random_uuid()"
                    },
                    {
                        name: "message_external_id",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "old_text",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "edit_date",
                        type: "timestamp",
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
                        name: "IDX_message_edits_message_external_id_edit_date",
                        columnNames: ["message_external_id", "edit_date"]
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_message_edits_message_external_id",
                        columnNames: ["message_external_id"],
                        referencedTableName: "messages",
                        referencedColumnNames: ["external_id"],
                        onDelete: "CASCADE"
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("message_edits");
    }

}
