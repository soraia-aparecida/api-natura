import { Voucher } from "../infra/typeorm/entities/Voucher"

interface IVoucherRepository {
    findByName(name: string): Promise<Voucher | undefined>;
    findById(id: number): Promise<Voucher | undefined>;
}

export { IVoucherRepository }