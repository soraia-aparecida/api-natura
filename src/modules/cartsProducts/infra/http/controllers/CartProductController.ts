import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCartProductService } from "../../../services/CreateCartProductService";
import { DeleteCartProductService } from "../../../services/DeleteCartProductService";
import { UpdateCartProductService } from "../../../services/UpdateCartProductService";

class CartProductController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { cartId, productId, quantity } = request.body

        const createCartProduct = container.resolve(CreateCartProductService);
        const cart = await createCartProduct.execute({
            cart_id: cartId,
            product_id: productId,
            quantity
        });

        return response.status(201).json(cart);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { quantity } = request.body

        const updateCartProduct = container.resolve(UpdateCartProductService);
        const cart = await updateCartProduct.execute({
            id: Number(id),
            quantity
        });

        return response.status(200).json(cart);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
     try {
        const { id } = request.params;

        const deleteCartProduct = container.resolve(DeleteCartProductService);
        const cart = await deleteCartProduct.execute(Number(id));

        return response.status(200).json(cart);
     } catch (error) {
        console.log("🚀 ~ CartProductController ~ delete ~ error:", error)
        return response.status(400)
     }
    }
}

export { CartProductController };