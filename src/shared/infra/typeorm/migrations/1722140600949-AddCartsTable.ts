import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddCartsTable1722140600949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "carts",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generationStrategy: "increment",
                        isGenerated: true,
                    },
                    {
                        name: "paid",
                        type: "bool"
                    },
                    {
                        name: "user_id",
                        type: "int"
                    },
                    {
                        name: "pay_day",
                        type: "timestamp",
                        isNullable: true,
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

        const userFK = new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            name: "FK-cart_users",
        });

        await queryRunner.createForeignKey("carts", userFK);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("carts", "FK-cart_users");
        await queryRunner.dropTable("carts");
    }
}
