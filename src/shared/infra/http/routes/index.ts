import { cartRouter } from "@modules/carts/infra/http/routes/cart.routes";
import { cartProductRouter } from "@modules/cartsProducts/infra/http/routes/cartProduct.routes";
import { productRouter } from "@modules/products/infra/http/routes/product.routes";
import { userRouter } from "@modules/users/infra/http/routes/user.routes";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/auth";
import { voucherRouter } from "@modules/vouchers/infra/http/routes/voucher.routes";
import { categoryRouter } from "@modules/categories/infra/http/routes/category.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/product", ensureAuthenticated, productRouter);
routes.use("/cart", ensureAuthenticated, cartRouter);
routes.use("/item", ensureAuthenticated, cartProductRouter);
routes.use("/voucher", ensureAuthenticated, voucherRouter);
routes.use("/category", ensureAuthenticated, categoryRouter);

export { routes };