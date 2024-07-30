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

        #swagger.security = [{
            "bearerAuth": []
        }]

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
            schema: {
                id: 1,
                type: "fixed​",
                name: "DESCONTO25",
                price: 25,
                is_valid: true,
                created_at: "2024-07-28T18:47:05.000Z",
                updated_at: "2024-07-28T18:47:05.000Z",
                deleted_at: null
            }
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