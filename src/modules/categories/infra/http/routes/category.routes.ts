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
        #swagger.path="/pcategory"
        #swagger.summary = 'Listagem das categorias'
        #swagger.description = 'Apresenta uma listagem das categorias de produtos disponíveis.'

        #swagger.parameters[''] = {
            name: "token",
            in: 'header',
            schema: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }

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