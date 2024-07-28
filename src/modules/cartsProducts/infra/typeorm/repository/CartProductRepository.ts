import { getRepository, Repository } from "typeorm";
import { ICartProductRepository } from "../../../repositories/ICartProductRepository";
import { CartProduct } from "../entities/CartProduct";
import { ICreateCartProductDTO } from "../../../dtos/ICreateCartProductDTO";

class CartProductRepository implements ICartProductRepository {
    private ormRepository: Repository<CartProduct>;

    constructor() {
        this.ormRepository = getRepository(CartProduct);
    }

    public async create(data: ICreateCartProductDTO): Promise<CartProduct> {
        console.log("🚀 ~ CartProductRepository ~ create ~ data:", data)
        try {

            const product = this.ormRepository.create(data);
            console.log("🚀 ~ CartProductRepository ~ create ~ product:", product)
            await this.ormRepository.save(product);
            return product;

        } catch (error) {
            console.error("Error creating a new cart_product", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async update(data: Partial<CartProduct>): Promise<string> {
        try {
            const result = await this.ormRepository.update(data.id!, {
                ...(data.quantity && { quantity: data.quantity })
            });

            console.debug({ "result update cart_product": result });

            return "Success";
        } catch (error) {
            console.error("Error updating cart_product by id", JSON.stringify(error));
            throw new Error(JSON.stringify(error));
        }
    }

    public async softDelete(id: number): Promise<string> {
        try {
            await this.ormRepository.softDelete(id);
            return "Success";

        } catch (error) {
            console.error("Error deleting cart_product by id", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async findById(id: number): Promise<CartProduct | undefined> {
        try {
            const cartProduct = await this.ormRepository.findOne({
                where: {
                    id
                }
            });

            return cartProduct;
        } catch (error) {
            console.error("Error getting cart_product by id", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }
}

export { CartProductRepository };