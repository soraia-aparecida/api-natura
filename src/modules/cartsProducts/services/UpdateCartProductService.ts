import { inject, injectable } from "tsyringe";
import { CustomError } from '../../../shared/errors/CustomError';
import { ICartRepository } from "../../carts/repositories/ICartRepository";
import { IUpdateCartProductDTO } from "../dtos/IUpdateCartProductDTO";
import { ICartProductRepository } from "../repositories/ICartProductRepository";
import { Cart } from "../../carts/infra/typeorm/entities/Cart";

@injectable()
class UpdateCartProductService {
    constructor(
        @inject("CartProductRepository")
        private cartProductRepository: ICartProductRepository,
        @inject("CartRepository")
        private cartRepository: ICartRepository
    ) {
        console.info("Update cartProduct - service");
    }

    public async execute(data: IUpdateCartProductDTO): Promise<Cart | undefined> {
        try {
            const { id, quantity } = data;
            const cartProduct = await this.cartProductRepository.findById(id);

            if (!cartProduct) {
                throw new CustomError("Item não encontrado", 404);
            };

            await this.cartProductRepository.update({ id, quantity });

            const response = await this.cartRepository.findById(cartProduct.cart_id, true);
            return response;

        } catch (error: any) {
            console.error("🚀 ~ UpdateCartProductService ~ execute ~ error:", error)
            const status = error?.statusCode ?? 400;
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error), status);
        }
    }
}

export { UpdateCartProductService };
