import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../shared/errors/CustomError";
import { IVoucherRepository } from "../repositories/IVoucherRepository";
import { Voucher } from "../infra/typeorm/entities/Voucher";

@injectable()
class GetVoucherByNameService {
    constructor(
        @inject("VoucherRepository")
        private voucherRepository: IVoucherRepository
    ) {
        console.info("Get voucher by name - service");
    }

    public async execute(name: string): Promise<Voucher> {
        try {
            const voucher = await this.voucherRepository.findByName(name);

            if (!voucher) {
                throw new CustomError("Cupom não encontrado", 404);
            };

            return voucher;

        } catch (error: any) {
            const status = error?.statusCode ?? 400;
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error), status);
        }
    }
};

export { GetVoucherByNameService };