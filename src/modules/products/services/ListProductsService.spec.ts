import "reflect-metadata"
import { FakeProductRepository } from "../repositories/fake/FakeProductRepository";
import { Product } from "../infra/typeorm/entities/Product";

describe('ListProductsService', () => {
    let fakeProductRepository: FakeProductRepository;

    beforeEach(() => {
        fakeProductRepository = new FakeProductRepository();
    });

    jest.setTimeout(114200 * 1000);

    let product = new Product();

    product = {
        ...product,
        id: 1,
        name: "Shampoo alinhador",
        short_description: "Shampoo alinhador para cabelos ondulados",
        long_description: "Shampoo alinhador para cabelos ondulados e lisos.",
        composition: ["Água", "Queratina"],
        value: 78.85,
        in_stock: true,
        url_image: "https://www.google.com/imgres?q=shampoo%20natura&imgurl=https%3A%2F%2Fproduction.na01.natura.com%2Fon%2Fdemandware.static%2F-%2FSites-natura-br-storefront-catalog%2Fdefault%2Fdw6100376d%2FNATBRA-112021_2.jpg&imgrefurl=https%3A%2F%2Fwww.natura.com.br%2Fp%2Fshampoo-cremoso-para-cabelos-cacheados-lumina-300-ml%2FNATBRA-112021&docid=TePWUp7mOFM8BM&tbnid=ClBqlHRLtxSimM&vet=12ahUKEwiUgfuZ0siHAxUCr5UCHTS7JKIQM3oECB4QAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwiUgfuZ0siHAxUCr5UCHTS7JKIQM3oECB4QAA",
        category_id: 1,
        created_at: new Date('2024-07-12T17:00:31.259Z'),
        updated_at: new Date('2024-07-12T17:00:31.259Z'),
        deleted_at: null,
    };

    const product2 = {
        ...product,
        id: 2,
        name: "Shampoo alinhador 2",
        short_description: "Shampoo alinhador para cabelos ondulados 2",
        long_description: "Shampoo alinhador para cabelos ondulados e lisos 2",
        composition: ["Água", "Queratina"],
        value: 110.85,
        in_stock: true,
        url_image: "https://www.google.com/imgres?q=shampoo%20natura&imgurl=https%3A%2F%2Fproduction.na01.natura.com%2Fon%2Fdemandware.static%2F-%2FSites-natura-br-storefront-catalog%2Fdefault%2Fdw6100376d%2FNATBRA-112021_2.jpg&imgrefurl=https%3A%2F%2Fwww.natura.com.br%2Fp%2Fshampoo-cremoso-para-cabelos-cacheados-lumina-300-ml%2FNATBRA-112021&docid=TePWUp7mOFM8BM&tbnid=ClBqlHRLtxSimM&vet=12ahUKEwiUgfuZ0siHAxUCr5UCHTS7JKIQM3oECB4QAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwiUgfuZ0siHAxUCr5UCHTS7JKIQM3oECB4QAA",
        category_id: 1
    };

    const product3 = {
        ...product,
        id: 6,
        name: "Creme Nutritivo Para o Corpo Tododia Cereja e Avelã",
        short_description: "Creme Desodorante Nutritivo Para o Corpo Tododia Cereja e Avelã 400 ml",
        long_description: "Sinta seu corpo com o novo Creme Nutritivo Desodorante Tododia Cereja e Avelã. Uma combinação balanceada de ingredientes naturais com NUTRIÇÃO PREBIÓTICA, que se adapta ao que sua pele precisa a cada dia. Por isso, esse creme é indicado para todos os tipos de pele.",
        composition: ["Água", "Queratina"],
        value: 56.85,
        in_stock: true,
        url_image: "https://www.google.com/imgres?q=shampoo%20natura&imgurl=https%3A%2F%2Fproduction.na01.natura.com%2Fon%2Fdemandware.static%2F-%2FSites-natura-br-storefront-catalog%2Fdefault%2Fdw6100376d%2FNATBRA-112021_2.jpg&imgrefurl=https%3A%2F%2Fwww.natura.com.br%2Fp%2Fshampoo-cremoso-para-cabelos-cacheados-lumina-300-ml%2FNATBRA-112021&docid=TePWUp7mOFM8BM&tbnid=ClBqlHRLtxSimM&vet=12ahUKEwiUgfuZ0siHAxUCr5UCHTS7JKIQM3oECB4QAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwiUgfuZ0siHAxUCr5UCHTS7JKIQM3oECB4QAA",
        category_id: 3
    };

    it("must be able to list the products", async () => {

        const result = await fakeProductRepository.list({
            page: 1,
            perPage: 10
        })

        const products = [product, product2, product3];
        expect(result).toEqual(products);
    });

    it("should filter products by category", async () => {

        const result = await fakeProductRepository.list({
            page: 1,
            perPage: 10,
            categoryId: 3
        })

        const products = [product3];
        expect(result).toEqual(products);
    });

    it("should filter products by name or description", async () => {

        const result = await fakeProductRepository.list({
            page: 1,
            perPage: 10,
            text: "Shampoo alinhador"
        })

        const products = [product, product2];
        expect(result).toEqual(products);
    });

    it("should return an empty list when there are no products", async () => {

        const result = await fakeProductRepository.list({
            page: 1,
            perPage: 10,
            text: "Essencial Para Barbear"
        })

        expect(result).toEqual([]);
    });
});