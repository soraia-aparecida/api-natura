
import { getRepository, Repository } from "typeorm";
import { ICartRepository } from "../../../repositories/ICartRepository";
import { Cart } from "../entities/Cart";
import { ICreateCartDTO } from "../../../dtos/ICreateCartDTO";

class CartRepository implements ICartRepository {
    private ormRepository: Repository<Cart>;

    constructor() {
        this.ormRepository = getRepository(Cart);
    }

    public async create(data: ICreateCartDTO): Promise<Cart> {
        try {

            const cart = this.ormRepository.create(data);
            await this.ormRepository.save(cart);
            return cart;

        } catch (error) {
            console.error("Error creating a new cart", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async softDelete(id: number): Promise<string> {
        try {
            await this.ormRepository.softDelete(id);
            return "Success";

        } catch (error) {
            console.error("Error deleting cart by id", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async findById(id: number, returnRelation = false): Promise<Cart | undefined> {
        try {
            const queryBuilder = this.ormRepository.createQueryBuilder('cart')
                .where('cart.id = :id', { id })
                .select([
                    'cart.id',
                    'cart.paid',
                    'cart.pay_day',
                    'cart.created_at',
                ]);

            if (returnRelation) {
                queryBuilder
                    .innerJoin('cart.items', "item")
                    .addSelect(['item.id', 'item.quantity', 'item.product'])
                    .innerJoin('item.product', 'product')
                    .addSelect(['product'])
            }

            const cart = await queryBuilder.getOne();
            return cart;

        } catch (error) {
            console.error("Error getting cart by id", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async update(data: Partial<Cart>): Promise<string> {
        try {
            const result = await this.ormRepository.update(data.id!, {
                ...(data.paid && { paid: data.paid }),
                ...(data.pay_day && { pay_day: data.pay_day })
            });

            console.debug({ "result update cart": result });
            return "Success";

        } catch (error) {
            console.error("Error updating cart by id", JSON.stringify(error));
            throw new Error(JSON.stringify(error));
        }
    }
}

export { CartRepository };