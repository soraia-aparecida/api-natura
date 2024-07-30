import { IVoucherRepository } from "../../vouchers/repositories/IVoucherRepository";
import { inject, injectable } from "tsyringe";
import { CustomError } from '../../../shared/errors/CustomError';
import { ICartRepository } from "../../carts/repositories/ICartRepository";
import { IUpdateCartDTO } from "../dtos/IUpdateCartDTO";
import { Cart } from "../infra/typeorm/entities/Cart";

@injectable()
class UpdateCartService {
    constructor(
        @inject("CartRepository")
        private cartRepository: ICartRepository,
        @inject("VoucherRepository")
        private voucherRepository: IVoucherRepository
    ) {
        console.info("Create new cart - service");
    }

    public async execute(data: IUpdateCartDTO): Promise<Cart> {
        try {
            const { id, paid, userId, voucherId } = data;
            console.log("🚀 ~ UpdateCartService ~ execute ~ userId:", userId)

            const cart = await this.cartRepository.findById(id);

            if (!cart) {
                throw new CustomError("Carrinho não encontrado", 404);
            };

            if (cart.user_id !== userId) {
                throw new CustomError("Ação não permitida", 403);
            };

            if (voucherId) {
                const voucher = await this.voucherRepository.findById(voucherId);
                if (!voucher) {
                    throw new CustomError("Voucher não encontrado", 404);
                }
            };

            let payDay = null;

            if (!!paid && !cart.paid) {
                payDay = new Date();
            }

            await this.cartRepository.update({
                id,
                paid,
                pay_day: payDay,
                voucher_id: voucherId
            });

            const actualCart =  await this.cartRepository.findById(id);
            console.log("🚀 ~ UpdateCartService ~ execute ~ actualCart:", actualCart)
            return actualCart!;

        } catch (error: any) {
            console.log("🚀 ~ UpdateCartService ~ execute ~ error:", error)
            const status = error?.statusCode ?? 400;
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error), status);
        }
    }
}

export { UpdateCartService };
