import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { VoucherController } from "../controllers/VoucherController";

const voucherRouter = Router();
const voucherController = new VoucherController();

voucherRouter.get(
    "/",
    /*
        #swagger.tags = ['Cupons'] 
        #swagger.autoBody=true
        #swagger.autoQuery=true
        #swagger.autoHeaders=true
        #swagger.path="/voucher"
        #swagger.summary = 'Busca um cupom de desconto'
        #swagger.description = 'Busca um cupom de desconto válido'

         #swagger.parameters[''] = {
            name: "token",
            in: 'header',
            schema: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }

        #swagger.parameters[name'] = {
            in: 'query',
            description: 'nome do cupom de desconto',
            required: false,
            schema: {
                type: 'string',
                example: "10%Off"
            }
        }
    
        #swagger.responses[200] = {
          schema: {}
        }
    */
    celebrate({
        [Segments.QUERY]: {
            name: Joi.string().required()
        },
    }),
    voucherController.find,
);

export { voucherRouter };