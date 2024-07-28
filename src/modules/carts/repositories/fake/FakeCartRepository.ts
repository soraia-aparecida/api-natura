import "reflect-metadata"
import { injectable } from "tsyringe";
import { CartProduct } from "../../../cartsProducts/infra/typeorm/entities/CartProduct";
import { ICreateCartDTO } from "../../dtos/ICreateCartDTO";
import { Cart } from "../../infra/typeorm/entities/Cart";
import { ICartRepository } from "../ICartRepository";

@injectable()
class FakeCartRepository implements ICartRepository {

    private carts: Cart[] = [];
    private cart = {
        ...this.carts[0],
        id: 1,
        user_id: 1,
        paid: false,
        pay_day: null,
        created_at: new Date('2024-07-12T17:00:31.259Z'),
        updated_at: new Date('2024-07-12T17:00:31.259Z'),
        deleted_at: null,
        items: [new CartProduct()]
    };

    public async create(data: ICreateCartDTO): Promise<Cart> {
        return this.cart;
    };

    public async findById(id: number): Promise<Cart | undefined> {
        if (id === this.cart.id) {
            return this.cart;
        } else {
            return undefined
        }
    };

    public async softDelete(id: number): Promise<string> {
        return "Success";
    };

    public async update(data: Partial<Cart>): Promise<string> {
        return "Success";
    };
}

export { FakeCartRepository };
