import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddUsersTable1722137706179 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generationStrategy: "increment",
                        isGenerated: true,
                    },
                    {
                        name: "is_guest",
                        type: "bool"
                    },
                    {
                        name: "profile",
                        type: "varchar"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
