import { inject, injectable } from "tsyringe";
import { CustomError } from '../../../shared/errors/CustomError';
import { ICartProductRepository } from "../repositories/ICartProductRepository";

@injectable()
class DeleteCartProductService {
    constructor(
        @inject("CartProductRepository")
        private cartProductRepository: ICartProductRepository
    ) {
        console.info("Delete cartProduct - service");
    }

    public async execute(id: number): Promise<void> {
        try {
            await this.cartProductRepository.softDelete(id);

        } catch (error: any) {
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error));
        }
    }
}

export { DeleteCartProductService };

