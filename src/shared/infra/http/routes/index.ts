import { cartRouter } from "@modules/carts/infra/http/routes/cart.routes";
import { cartProductRouter } from "@modules/cartsProducts/infra/http/routes/cartProduct.routes";
import { productRouter } from "@modules/products/infra/http/routes/product.routes";
import { userRouter } from "@modules/users/infra/http/routes/user.routes";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/auth";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/product", ensureAuthenticated, productRouter);
routes.use("/cart", ensureAuthenticated, cartRouter);
routes.use("/item", ensureAuthenticated, cartProductRouter);

export { routes };