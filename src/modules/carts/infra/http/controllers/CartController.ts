import { CreateCartService } from "@modules/carts/services/CreateCartService";
import { UpdateCartService } from "@modules/carts/services/UpdateCartService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class CartController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { user } = request;

        const createCartService = container.resolve(CreateCartService);
        const cart = await createCartService.execute(user.id);

        return response.status(201).json(cart);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        try {
            const { user } = request;
            const { paid, payDay, voucherId } = request.body;
            const { id } = request.params;

            const updateCart = container.resolve(UpdateCartService);
            const cart = await updateCart.execute({
                id: Number(id),
                paid,
                userId: user.id,
                payDay,
                voucherId
            });

            return response.status(200).json(cart);
        } catch (error) {
            console.log("🚀 ~ CartController ~ update ~ error:", error)
            return response.status(204)
        }
    }
}

export { CartController };