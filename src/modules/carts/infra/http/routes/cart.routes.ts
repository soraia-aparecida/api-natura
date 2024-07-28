import { Router } from "express";
import { CartController } from "../controllers/CartController";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.post(
    "/",
    /*
        #swagger.tags = ['Carrinho']
        #swagger.autoBody=true
        #swagger.autoQuery=true
        #swagger.autoHeaders=true
        #swagger.path="/cart"
        #swagger.summary = 'Cria um carrinho'
        #swagger.description = 'Cria um novo carrinho para o usuário ativo'

        #swagger.parameters[''] = {
            name: "token",
            in: 'header',
            schema: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }
    
        #swagger.responses[201] = {
            schema:{
                $id: 999,
                $user_id: 1,
                $paid: false,
                $pay_day: null,
                $created_at: "2024-07-27T00:00:00.000Z",
                $updated_at: "2024-07-27T00:00:00.000Z"
            }
        }
    */
    cartController.create,
);

cartRouter.put(
    "/:id",
    /*
        #swagger.tags = ['Carrinho']
        #swagger.autoBody=true
        #swagger.autoQuery=true
        #swagger.autoHeaders=true
        #swagger.path="/cart"
        #swagger.summary = 'Edita um carrinho'
        #swagger.description = 'Edita o carrinho do usuário ativo'

        #swagger.parameters[''] = {
          name: "token",
          in: 'header',
          schema: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id do item a ser alterado.',
            required: true,
            schema: {
                type: 'integer',
                example: 1
            }
        }

        #swagger.parameters[''] = {
          in: 'body',
          schema: {
              paid: true,
              voucherId: 1
          }
      }
    
        #swagger.responses[200] = {
            schema:{
                $id: 999,
                $user_id: 1,
                $paid: false,
                $pay_day: null,
                $created_at: "2024-07-27T00:00:00.000Z",
                $updated_at: "2024-07-27T00:00:00.000Z"
            }
        }
    */
    cartController.update,
);

export { cartRouter };