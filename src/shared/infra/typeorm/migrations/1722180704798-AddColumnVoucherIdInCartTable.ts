import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColumnVoucherIdInCartTable1722180704798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "carts",
            new TableColumn({
                name: "voucher_id",
                type: "int",
                isNullable: true,
                default: null
            })
        );

        const voucherFK = new TableForeignKey({
            columnNames: ["voucher_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "vouchers",
            name: "FK-vouchers-carts",
        });

        await queryRunner.createForeignKey("carts", voucherFK);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("carts", "FK-vouchers-carts");
        await queryRunner.dropColumn("carts", "voucher_id");
    }
}
