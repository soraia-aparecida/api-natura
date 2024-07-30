import { IUserRepository } from "../../users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { CustomError } from '../../../shared/errors/CustomError';
import { ICartRepository } from "../../carts/repositories/ICartRepository";
import { Cart } from "../infra/typeorm/entities/Cart";

@injectable()
class CreateCartService {
    constructor(
        @inject("CartRepository")
        private cartRepository: ICartRepository,
        @inject("UserRepository")
        private userRepository: IUserRepository,
    ) {
        console.info("Create new cart - service");
    }

    public async execute(userId: number): Promise<Cart> {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new CustomError("Usuário não encontrado", 404);
            }

            const cart = await this.cartRepository.create({
                user_id: userId,
                paid: false
            });
            return cart;

        } catch (error: any) {
            console.log("🚀 ~ CreateCartService ~ execute ~ error:", error)
            const status = error?.statusCode ?? 400;
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error), status);
        }
    }
}

export { CreateCartService };
