import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProductsService } from "../../../services/ListProductsService";

class ProductController {
    public async list(request: Request, response: Response): Promise<Response> {
        const { page, perPage, text, categoryId } = request.query;

        const listProducts = container.resolve(ListProductsService);
        const products = await listProducts.execute({
            page: Number(page),
            perPage: Number(perPage),
            ...(text && { text: String(text) }),
            ...(categoryId && { categoryId: Number(categoryId) })
        });

        return response.status(200).json({ products });
    }
}

export { ProductController };