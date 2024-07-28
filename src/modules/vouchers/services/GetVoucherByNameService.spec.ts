import "reflect-metadata"
import { FakeVoucherRepository } from "../repositories/fake/FakeVoucherRepository";
import { Voucher } from "../infra/typeorm/entities/Voucher";


describe('GetVoucherByNameService', () => {
    let fakeVoucherRepository: FakeVoucherRepository;

    beforeEach(() => {
        fakeVoucherRepository = new FakeVoucherRepository();
    });

    jest.setTimeout(114200 * 1000);

    let voucher = new Voucher();

    voucher = {
        ...voucher,
        id: 1,
        name: "DESCONTO25",
        type: "fixed",
        is_valid: true,
        price: 25.00,
        created_at: new Date('2024-07-12T17:00:31.259Z'),
        updated_at: new Date('2024-07-12T17:00:31.259Z'),
        deleted_at: null,
    };

    it("should filter voucher by name", async () => {
        const result = await fakeVoucherRepository.findByName('desconto25')
        expect(result).toEqual(voucher);
    });

    it("should return an error message when there are no coupons", async () => {

        async function verifyVoucher(name: string) {

            const resultProduct = await fakeVoucherRepository.findByName(name);

            if (resultProduct === undefined) {
                return `Cupom não encontrado.`

            } else {
                return voucher
            }
        }

        verifyVoucher('cupom10').then(data => {
            expect(data).toBe("Cupom não encontrado.");
        });
    });
});