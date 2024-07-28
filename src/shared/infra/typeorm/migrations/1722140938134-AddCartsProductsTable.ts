import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddCartsProductsTable1722140938134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "carts_products",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generationStrategy: "increment",
                        isGenerated: true,
                    },
                    {
                        name: "cart_id",
                        type: "int"
                    },
                    {
                        name: "product_id",
                        type: "int"
                    },
                    {
                        name: "quantity",
                        type: "int"
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
            columnNames: ["cart_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "carts",
            name: "FK-carts-products_carts",
        });

        await queryRunner.createForeignKey("carts_products", userFK);

        const categoryFK = new TableForeignKey({
            columnNames: ["product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "products",
            name: "FK-carts-products-products",
        });

        await queryRunner.createForeignKey("carts_products", categoryFK);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("carts_products", "FK-carts-products_carts");
        await queryRunner.dropForeignKey("carts_products", "FK-carts-products-products");
        await queryRunner.dropTable("carts_products");
    }
}
