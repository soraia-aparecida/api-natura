import { SimpleListCategoriesService } from "@modules/categories/services/SimpleListCategoriesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class CategoryController {
    public async list(request: Request, response: Response): Promise<Response> {

        try {
            const listCategory = container.resolve(SimpleListCategoriesService);
            const categories = await listCategory.execute();

            return response.status(200).json({ categories });
        } catch (error) {
        console.log("🚀 ~ CategoryController ~ list ~ error:", error)
        return response.status(400)
        }
    }
}

export { CategoryController };