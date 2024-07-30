import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get(
    "/",
    /*
        #swagger.tags = ['Categorias']
        #swagger.autoBody=true
        #swagger.autoQuery=true
        #swagger.autoHeaders=true
        #swagger.path="/category"
        #swagger.summary = 'Listagem das categorias'
        #swagger.description = 'Apresenta uma listagem das categorias de produtos disponíveis.'

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.responses[200] = {
        description: "Lista de categorias",
        schema: {
            categories: [
                {
                    id: 1,
                    name: "perfumaria",
                    created_at: "2024-07-28T08:50:48.000Z",
                    updated_at: "2024-07-28T08:50:48.000Z",
                    deleted_at: null
                },
                {
                    id: 1,
                    name: "presentes",
                    created_at: "2024-07-28T08:50:48.000Z",
                    updated_at: "2024-07-28T08:50:48.000Z",
                    deleted_at: null
                }
            ]
        }
    }
    */
    categoryController.list,
);

export { categoryRouter };