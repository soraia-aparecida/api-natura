import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { CartProductController } from "../controllers/CartProductController";

const cartProductRouter = Router();
const cartProductController = new CartProductController();

cartProductRouter.post(
    "/",
    /*
    #swagger.tags = ['Items']
    #swagger.autoBody=true
    #swagger.autoQuery=true
    #swagger.autoHeaders=true
    #swagger.path="/item"
    #swagger.summary = 'Adiciona items ao carrinho'
    #swagger.description = 'Adiciona items ao carrinho para o usuário ativo'

    #swagger.parameters[''] = {
        name: "token",
        in: 'header',
        schema: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }

    #swagger.parameters[''] = {
        in: 'body',
        schema: {
            cartId: 1,
            productId: 1,
            quantity: 1
        }
    }

    #swagger.responses[201] = {
        schema: {
            id: 1,
            paid: false,
            pay_day: null,
            created_at: "2024-07-27T00:00:00.000Z",
            items: [
                {
                    id: 5,
                    quantity: 3,
                    product: {
                        id: 1,
                        name: "Una Blush 75 ml",
                        short_description: "A fragrância icônica de Una Blush em uma edição especial com embalagem colecionável.",
                        long_description: "Inspirado no elegante retorno do brilho à maquiagem e à perfumaria, o Deo Parfum Una Blush traz a sofisticação da flor de laranjeira e um toque único de breu branco, resina amazônica natural da biodiversidade brasileira.​ Una acredita na beleza genuína, a beleza de se sentir bem na própria pele, própria de uma mulher que se conhece, se valoriza e se expressa com a elegância de fragrâncias marcantes.​",
                        composition: "{'ALCOHOL','ÁLCOOL ETÍLICO','PARFUM','PERFUME','AQUA','ÁGUA','BENZYL SALICYLATE','SALICILATO DE BENZILA','LIMONENE'}",
                        value: 78.85,
                        in_stock: true,
                        url_image: "https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dw0bad0999/Produtos%20Joia/2024/01/NATBRA-128756/128756_BENEFICIOS.jpg",
                        category_id: 1,
                        created_at: "2024-07-28T08:50:47.000Z",
                        updated_at: "2024-07-28T08:50:47.000Z",
                        deleted_at: null
                    }
                }
            ]
        }
    }
*/
    celebrate({
        [Segments.BODY]: {
            cartId: Joi.number().required(),
            productId: Joi.number().required(),
            quantity: Joi.number().required(),
        },
    }),
    cartProductController.create,
);

cartProductRouter.put(
    "/:id",
    /*
      #swagger.tags = ['Items']
      #swagger.autoBody=true
      #swagger.autoQuery=true
      #swagger.autoHeaders=true
      #swagger.path="/item/{id}"
      #swagger.summary = 'Edita os items do carrinho'
      #swagger.description = 'Edita os items do carrinho para o usuário ativo'
  
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
              quantity: 2
          }
      }
  
      #swagger.responses[200] = {
          schema: {
              id: 1,
              paid: false,
              pay_day: null,
              created_at: "2024-07-27T00:00:00.000Z",
              items: [
                  {
                      id: 5,
                      quantity: 3,
                      product: {
                          id: 1,
                          name: "Una Blush 75 ml",
                          short_description: "A fragrância icônica de Una Blush em uma edição especial com embalagem colecionável.",
                          long_description: "Inspirado no elegante retorno do brilho à maquiagem e à perfumaria, o Deo Parfum Una Blush traz a sofisticação da flor de laranjeira e um toque único de breu branco, resina amazônica natural da biodiversidade brasileira.​ Una acredita na beleza genuína, a beleza de se sentir bem na própria pele, própria de uma mulher que se conhece, se valoriza e se expressa com a elegância de fragrâncias marcantes.​",
                          composition: "{'ALCOHOL','ÁLCOOL ETÍLICO','PARFUM','PERFUME','AQUA','ÁGUA','BENZYL SALICYLATE','SALICILATO DE BENZILA','LIMONENE'}",
                          value: 78.85,
                          in_stock: true,
                          url_image: "https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dw0bad0999/Produtos%20Joia/2024/01/NATBRA-128756/128756_BENEFICIOS.jpg",
                          category_id: 1,
                          created_at: "2024-07-28T08:50:47.000Z",
                          updated_at: "2024-07-28T08:50:47.000Z",
                          deleted_at: null
                      }
                  }
              ]
          }
      }
  */
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
        [Segments.BODY]: {
            quantity: Joi.number().required(),
        },
    }),
    cartProductController.update,
);

cartProductRouter.delete(
    "/:id",
    /*
        #swagger.tags = ['Items']
        #swagger.autoBody=true
        #swagger.autoQuery=true
        #swagger.autoHeaders=true
        #swagger.path="/item/{id}"
        #swagger.summary = 'Deleta items do carrinho'
        #swagger.description = 'Deleta items do carrinho do usuário ativo'

        #swagger.parameters[''] = {
            name: "token",
            in: 'header',
            schema: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id do item a ser deleteado do carrinho.',
            required: true,
        }
    
        #swagger.responses[200]
    */
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        }
    }),
    cartProductController.delete,
);

export { cartProductRouter };