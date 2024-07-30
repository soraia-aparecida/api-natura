import { inject, injectable } from "tsyringe";
import { ICartProductRepository } from "../repositories/ICartProductRepository";
import { IProductRepository } from "../../products/repositories/IProductRepository";
import { ICreateCartProductDTO } from "../dtos/ICreateCartProductDTO";
import { CustomError } from '../../../shared/errors/CustomError';
import { ICartRepository } from "../../carts/repositories/ICartRepository";
import { Cart } from "../../carts/infra/typeorm/entities/Cart";

@injectable()
class CreateCartProductService {
    constructor(
        @inject("CartProductRepository")
        private cartProductRepository: ICartProductRepository,
        @inject("CartRepository")
        private cartRepository: ICartRepository,
        @inject("ProductRepository")
        private productRepository: IProductRepository,
    ) {
        console.info("Create new cartProduct - service");
    }

    public async execute(data: ICreateCartProductDTO): Promise<Cart> {

        try {
            const productPromise = this.productRepository.findById(data.product_id);
            const cartPromise = this.cartRepository.findById(data.cart_id);

            const [product, cart] = await Promise.all([productPromise, cartPromise]);

            if (!product || !cart) {
                throw new CustomError(`${!product ? "Produto" : "Carrinho"} não encontrado`, 404);
            }

            await this.cartProductRepository.create(data);

            const response = await this.cartRepository.findById(data.cart_id, true);
            return response!;

        } catch (error: any) {
            console.log("🚀 ~ CreateCartProductService ~ execute ~ error:", error)
            const status = error?.statusCode ?? 400;
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error), status);
        }
    }
}

export { CreateCartProductService };