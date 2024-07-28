import { CreateCartService } from "@modules/carts/services/CreateCartService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class CartController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { user } = request;

            const createCartService = container.resolve(CreateCartService);
            const cart = await createCartService.execute(user.id);

            return response.status(201).json(cart);
        } catch (error) {
            console.log("🚀 ~ CartController ~ create ~ error:", error)
            return response.status(201)
        }
    }
}

export { CartController };