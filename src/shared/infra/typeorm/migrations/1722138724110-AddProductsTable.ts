import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddProductsTable1722138724110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
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
                        name: "short_description",
                        type: "varchar"
                    },
                    {
                        name: "long_description",
                        type: "varchar",
                        length: '700'
                    },
                    {
                        name: "value",
                        type: "float",
                    },
                    {
                        name: "composition",
                        type: "json",
                    },
                    {
                        name: "url_image",
                        type: "varchar",
                        length: '500'
                    },
                    {
                        name: "in_stock",
                        type: "bool"
                    },
                    {
                        name: "category_id",
                        type: "int",
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

        const categoryFK = new TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
            name: "FK-products-category",
        });

        await queryRunner.createForeignKey("products", categoryFK);

        await queryRunner.manager.insert("products", {
            id: 1,
            name: "Una Blush 75 ml",
            short_description: "A fragrância icônica de Una Blush em uma edição especial com embalagem colecionável.",
            long_description: "Inspirado no elegante retorno do brilho à maquiagem e à perfumaria, o Deo Parfum Una Blush traz a sofisticação da flor de laranjeira e um toque único de breu branco, resina amazônica natural da biodiversidade brasileira.​ Una acredita na beleza genuína, a beleza de se sentir bem na própria pele, própria de uma mulher que se conhece, se valoriza e se expressa com a elegância de fragrâncias marcantes.​",
            composition: '{"ALCOHOL","ÁLCOOL ETÍLICO","PARFUM","PERFUME","AQUA","ÁGUA","BENZYL SALICYLATE","SALICILATO DE BENZILA","LIMONENE"}',
            value: 78.85,
            in_stock: true,
            url_image: "https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dw0bad0999/Produtos%20Joia/2024/01/NATBRA-128756/128756_BENEFICIOS.jpg",
            category_id: 1,
        });

        await queryRunner.manager.insert("products", {
            id: 2,
            name: "Una Infinito 75 ml",
            short_description: "Desodorante Perfume Una Infinito 75 ml.",
            long_description: "Inspirada nas misteriosas combinações da Galáxia, essa fragrância carrega consigo uma explosão de brilho criada pela combinação da cremosa ameixa negra à notas amadeiradas e cítricas. Intenso e adocicado para combinar com o look da sua maquiagem da Coleção Infinito.​",
            composition: '{"ALCOHOL","ÁLCOOL ETÍLICO","PARFUM","PERFUME","AQUA","ÁGUA","BENZYL SALICYLATE","SALICILATO DE BENZILA","LIMONENE"}',
            value: 178.85,
            in_stock: true,
            url_image: "https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dw244a87b7/NATBRA-43135_1.jpg",
            category_id: 1,
        });

        await queryRunner.manager.insert("products", {
            id: 3,
            name: "Presente Natura Mamãe e Bebê Momento Banho",
            short_description: "Ritual com carinho e cuidado para usar desde o primeiro banho do bebê.",
            long_description: "O Presente Natura Mamãe e Bebê Momento Banho traz um ritual de cuidado e carinho. As fórmulas de Mamãe e Bebê são suaves e seguras, testadas por pediatras, e podem ser utilizadas desde o primeiro dia de vida do bêbe. Este presente contém o Sabonete em Barra com Saboneteira, a clássica Água de Colônia Mamãe e Bebê e o Shampoo que limpa sem irritar o couro cabeludo e os olhinhos do bebê. Acompanha um saquinho colecionável em tecido, com ilustração exclusiva e comemorativa aos 30 anos da marca Mamãe e Bebê.​",
            composition: '{"ALCOHOL","ÁLCOOL ETÍLICO","PARFUM","PERFUME","AQUA","ÁGUA","BENZYL SALICYLATE","SALICILATO DE BENZILA","LIMONENE"}',
            value: 298.85,
            in_stock: true,
            url_image: "https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dw596a47df/produto-joia/background/mobile/125716.jpg",
            category_id: 2,
        });

        await queryRunner.manager.insert("products", {
            id: 4,
            name: "Presente Natura Homem Trio de Desodorantes",
            short_description: "3 sucessos de Natura Homem para manter você protegido e perfumado o dia todo.",
            long_description: "O Presente Natura Homem Trio de Desodorantes foi desenvolvido para manter você protegido e perfumado ao longo do dia, com três fragrâncias inspiradas nos maiores sucessos da perfumaria Natura. O kit contém o Desodorante Corporal Natura Homem Essence, o Desodorante Corporal Natura Homem Cor.agio e o clássico Desodorante Corporal Natura Homem. Fórmulas que combinam tecnologia desodorante que protege contra os odores da transpiração com perfumação que é perfeita para o seu dia a dia. Sensação de frescor e bem-estar para o corpo todo. Acompanha sacola de presente P.​",
            composition: '{"ALCOHOL","ÁLCOOL ETÍLICO","PARFUM","PERFUME","AQUA","ÁGUA","BENZYL SALICYLATE","SALICILATO DE BENZILA","LIMONENE"}',
            value: 38.85,
            in_stock: true,
            url_image: "https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dw5045bd58/NATBRA-161489_1.jpg",
            category_id: 2,
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("products", "FK-products-category");
        await queryRunner.dropTable("products");
    }
}
