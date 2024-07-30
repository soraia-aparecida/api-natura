import { GetVoucherByNameService } from "../../../../vouchers/services/GetVoucherByNameService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class VoucherController {
    public async find(request: Request, response: Response): Promise<Response> {
        const { name } = request.query

        const getVoucher = container.resolve(GetVoucherByNameService);
        const voucher = await getVoucher.execute(name as string);

        return response.status(200).json(voucher);
    }
}

export { VoucherController };