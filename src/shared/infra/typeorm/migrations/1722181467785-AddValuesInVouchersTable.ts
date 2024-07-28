import { MigrationInterface, QueryRunner } from "typeorm";

export class AddValuesInVouchersTable1722181467785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert("vouchers", {
            id: 1,
            is_valid: true,
            price: 25.00,
            type: "fixed​",
            name: 'DESCONTO10'
        });

        await queryRunner.manager.insert("vouchers", {
            id: 2,
            is_valid: true,
            price: 50.00,
            type: "fixed​",
            name: 'DESCONTO50'
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.delete("vouchers", { id: 1 });
        await queryRunner.manager.delete("vouchers", { id: 2 });
    }
}
