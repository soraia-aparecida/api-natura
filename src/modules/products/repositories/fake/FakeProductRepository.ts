import "reflect-metadata"
import { injectable } from "tsyringe";
import { IProductRepository } from "../IProductRepository";
import { Product } from "../../../products/infra/typeorm/entities/Product";
import { ICreateProductDTO } from "../../../products/dtos/ICreateProductDTO";
import { IListProductsDTO } from "../../../products/dtos/IListProductsDTO";

@injectable()
class FakeProductRepository implements IProductRepository {

    private products: Product[] = [];
    private product = {
        ...this.products[0],
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

    private product2 = {
        ...this.product,
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

    private product3 = {
        ...this.product,
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

    public async create(data: ICreateProductDTO): Promise<Product> {
        return this.product;
    }

    public async findById(id: number): Promise<Product | undefined> {
        if (id === this.product.id) {
            return this.product;
        } else {
            return undefined
        }
    }

    public async softDelete(id: number): Promise<string> {
        return "Success";
    }

    public async update(data: Partial<Product>): Promise<string> {
        return "Success";
    }

    public async list(params: IListProductsDTO): Promise<Product[]> {
        this.products.push(this.product, this.product2, this.product3);

        if (!!params.categoryId) {
            const productsByCategoryId = this.products.filter((p) => p.category_id === params.categoryId)
            return productsByCategoryId;
        }

        if (!!params.text) {
            const text = params.text!.toLowerCase();

            const productsByText = this.products.filter((p) =>
                p.name.toLowerCase().includes(text) ||
                p.short_description.toLowerCase().includes(text) ||
                p.long_description.toLowerCase().includes(text)
            )
            return productsByText;
        }

        return this.products;
    }
}

export { FakeProductRepository };
