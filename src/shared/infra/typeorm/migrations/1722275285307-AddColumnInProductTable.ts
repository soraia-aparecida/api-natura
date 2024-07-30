import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnInProductTable1722275285307 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "products",
            new TableColumn({
                name: "rating",
                type: "int",
                isNullable: true,
                default: 4
            })
        );

        await queryRunner.addColumn(
            "products",
            new TableColumn({
                name: "discount",
                type: "bool",
                isNullable: true,
                default: false
            })
        );

        await queryRunner.addColumn(
            "products",
            new TableColumn({
                name: "discount_percentage",
                type: "int",
                isNullable: true,
                default: null
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "rating");
        await queryRunner.dropColumn("products", "discount");
        await queryRunner.dropColumn("products", "discount_percentage");
    }
}
