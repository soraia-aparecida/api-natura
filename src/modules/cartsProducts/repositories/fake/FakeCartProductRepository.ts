import "reflect-metadata"
import { injectable } from "tsyringe";
import { ICartProductRepository } from "../ICartProductRepository";
import { CartProduct } from "@modules/cartsProducts/infra/typeorm/entities/CartProduct";
import { ICreateCartProductDTO } from "@modules/cartsProducts/dtos/ICreateCartProductDTO";


@injectable()
class FakeCartProductRepository implements ICartProductRepository {

    private cartsProducts: CartProduct[] = [];
    private cartProduct = {
        ...this.cartsProducts[0],
        id: 1,
        cart_id: 1,
        product_id: 1,
        quantity: 2,
        created_at: new Date('2024-07-12T17:00:31.259Z'),
        updated_at: new Date('2024-07-12T17:00:31.259Z'),
        deleted_at: null,
    };

    public async create(data: ICreateCartProductDTO): Promise<CartProduct> {
        return this.cartProduct;
    }

    public async findById(id: number): Promise<CartProduct | undefined> {
        if (id === this.cartProduct.id) {
            return this.cartProduct;
        } else {
            return undefined
        }
    }

    public async softDelete(id: number): Promise<string> {
        return "Success";
    }

    public async update(data: Partial<CartProduct>): Promise<string> {
        return "Success";
    }
}

export { FakeCartProductRepository };
