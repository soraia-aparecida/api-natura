import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/ICartRepository";
import { Cart } from "../infra/typeorm/entities/Cart";
import { CustomError } from "../../../shared/errors/CustomError";
import { IUpdateCartDTO } from "../dtos/IUpdateCartDTO";

injectable()
class UpdateCartService {
    constructor(
        @inject("CartRepository")
        private cartRepository: ICartRepository
    ) {
        console.info("Update cart - service");
    }

    public async execute(data: IUpdateCartDTO): Promise<Cart> {

        try {
            const { id, paid, payDay, userId } = data;

            const cart = await this.cartRepository.findById(id);

            if (!cart) {
                throw new CustomError("Carrinho não encontrado", 404);
            };

            if (cart.user_id !== userId) {
                throw new CustomError("Ação não permitida", 403);
            };

            await this.cartRepository.update({
                id,
                paid,
                pay_day: payDay
            });

            const actualCart = await this.cartRepository.findById(id);
            return actualCart!;

        } catch (error: any) {
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error));
        }
    }
};

export { UpdateCartService };