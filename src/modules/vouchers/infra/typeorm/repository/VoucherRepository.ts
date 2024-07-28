import { IVoucherRepository } from "@modules/vouchers/repositories/IVoucherRepository";
import { Voucher } from "../entities/Voucher";
import { getRepository, Repository } from "typeorm";
import { CustomError } from "@shared/errors/CustomError";

class VoucherRepository implements IVoucherRepository {
    private ormRepository: Repository<Voucher>;

    constructor() {
        this.ormRepository = getRepository(Voucher);
    }

    public async findByName(name: string): Promise<Voucher | undefined> {
        console.log("🚀 ~ VoucherRepository ~ findByName ~ name:", name)
        try {
            const query = this.ormRepository
                .createQueryBuilder("v")
                .where("LOWER(v.name) = :name", {
                    name: `${name.toLowerCase()}`,
                })
                .andWhere("v.is_valid = :is_valid", { is_valid: true })

            const voucher = await query.getOne();
            return voucher;

        } catch (error) {
            console.error("Error get voucher by name", JSON.stringify(error))
            throw new CustomError(JSON.stringify(error));
        }
    }

    public async findById(id: number): Promise<Voucher | undefined> {
        try {
            const voucher = await this.ormRepository.findOne({
                where: {
                    id
                }
            });

            return voucher;
        } catch (error) {
            console.error("Error get voucher by id", JSON.stringify(error))
            throw new CustomError(JSON.stringify(error));
        }
    }
}

export { VoucherRepository };
