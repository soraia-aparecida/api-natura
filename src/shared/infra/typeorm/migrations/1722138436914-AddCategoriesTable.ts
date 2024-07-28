import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddCategoriesTable1722138436914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "categories",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generationStrategy: "increment",
                        isGenerated: true,
                    },
                    {
                        name: "name",
                        type: "varchar"
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

        await queryRunner.manager.insert("categories", {
            id: 1,
            name: "perfumaria",
        });

        await queryRunner.manager.insert("categories", {
            id: 2,
            name: "presentes",
        });

        await queryRunner.manager.insert("categories", {
            id: 3,
            name: "corpo e banho",
        });

        await queryRunner.manager.insert("categories", {
            id: 4,
            name: "cabelos",
        });

        await queryRunner.manager.insert("categories", {
            id: 5,
            name: "maquiagem",
        });

        await queryRunner.manager.insert("categories", {
            id: 6,
            name: "rosto",
        });

        await queryRunner.manager.insert("categories", {
            id: 7,
            name: "casa",
        });

        await queryRunner.manager.insert("categories", {
            id: 8,
            name: "infantil",
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories");
    }
}
