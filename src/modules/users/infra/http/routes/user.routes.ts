import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { celebrate, Joi, Segments } from "celebrate";

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  "/",
  /*
      #swagger.tags = ['Usuário']
      #swagger.autoBody=true
      #swagger.autoQuery=true
      #swagger.autoHeaders=true
      #swagger.path="/user"
      #swagger.summary = 'Cria um novo usuário'
      #swagger.description = 'Cria um novo usuário'
  
      #swagger.parameters[''] = {
        in: 'body',
        schema: {
          email: "teste@teste.com",
          password: "1234@Abcd",
          profile: "user",
          isGuest: true,
          name: "Soraia"
        }
      }
  
      #swagger.responses[201] = {
        schema: {
          user: {
            id: 999,
            email: "teste@teste.com",
            profile: "user",
            isGuest: true,
            name: "Soraia",
            created_at: "2024-07-27T00:00:00.000Z",
            updated_at: "2024-07-27T00:00:00.000Z",
            deleted_at: "2024-07-27T00:00:00.000Z"
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }
      }
  */
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().optional(),
      password: Joi.string().optional().min(6),
      isGuest: Joi.boolean().required(),
      profile: Joi.string().required()
    },
  }),
  userController.create,
);

export { userRouter };