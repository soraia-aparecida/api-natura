import { Voucher } from "../../../vouchers/infra/typeorm/entities/Voucher";
import { IVoucherRepository } from "../IVoucherRepository";

class FakeVoucherRepository implements IVoucherRepository {

    private vouchers: Voucher[] = [];
    private voucher = {
        ...this.vouchers[0],
        id: 1,
        name: "DESCONTO25",
        type: "fixed",
        is_valid: true,
        price: 25.00,
        created_at: new Date('2024-07-12T17:00:31.259Z'),
        updated_at: new Date('2024-07-12T17:00:31.259Z'),
        deleted_at: null,
    };

    public async findById(id: number): Promise<Voucher | undefined> {
        if (id === this.voucher.id) {
            return this.voucher;
        } else {
            return undefined
        }
    }

    public async findByName(name: string): Promise<Voucher | undefined> {
        if (name.toLocaleLowerCase() === this.voucher.name.toLocaleLowerCase()) {
            return this.voucher;
        } else {
            return undefined
        }
    }
}

export { FakeVoucherRepository };