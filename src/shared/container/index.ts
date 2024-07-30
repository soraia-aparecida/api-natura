import { CartRepository } from "../../modules/carts/infra/typeorm/repository/CartRepository";
import { ICartRepository } from "../../modules/carts/repositories/ICartRepository";
import { CreateCartService } from "../../modules/carts/services/CreateCartService";
import { UpdateCartService } from "../../modules/carts/services/UpdateCartService";
import { CartProductRepository } from "../../modules/cartsProducts/infra/typeorm/repository/CartProductRepository";
import { ICartProductRepository } from "../../modules/cartsProducts/repositories/ICartProductRepository";
import { CreateCartProductService } from "../../modules/cartsProducts/services/CreateCartProductService";
import { DeleteCartProductService } from "../../modules/cartsProducts/services/DeleteCartProductService";
import { UpdateCartProductService } from "../../modules/cartsProducts/services/UpdateCartProductService";
import { CategoryRepository } from "../../modules/categories/infra/typeorm/repository/CategoryRepository";
import { ICategoryRepository } from "../../modules/categories/repositories/ICategoryRepository";
import { CreateCategoryService } from "../../modules/categories/services/CreateCategoryService";
import { SimpleListCategoriesService } from "../../modules/categories/services/SimpleListCategoriesService";
import { ProductRepository } from "../../modules/products/infra/typeorm/repository/ProductRepository";
import { IProductRepository } from "../../modules/products/repositories/IProductRepository";
import { ListProductsService } from "../../modules/products/services/ListProductsService";
import { UserRepository } from "../../modules/users/infra/typeorm/repository/UserRepository";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";
import { CreateUserService } from "../../modules/users/services/CreateUserService";
import { MeUserService } from "../../modules/users/services/MeUserService";
import { VoucherRepository } from "../../modules/vouchers/infra/typeorm/repository/VoucherRepository";
import { IVoucherRepository } from "../../modules/vouchers/repositories/IVoucherRepository";
import { GetVoucherByNameService } from "../../modules/vouchers/services/GetVoucherByNameService";
import { Authentication } from "../../shared/utils/Authentication";
import { HasManager } from "../../shared/utils/HasManager";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository,
);

container.registerSingleton<CreateUserService>(
    "CreateUserService",
    CreateUserService,
);

container.registerSingleton<MeUserService>(
    "MeUserService",
    MeUserService,
);

container.registerSingleton<HasManager>(
    "HasManager",
    HasManager,
);

container.registerSingleton<Authentication>(
    "Authentication",
    Authentication,
);

container.registerSingleton<IProductRepository>(
    "ProductRepository",
    ProductRepository,
);

container.registerSingleton<ListProductsService>(
    "ListProductsService",
    ListProductsService,
);

container.registerSingleton<ICartRepository>(
    "CartRepository",
    CartRepository,
);

container.registerSingleton<CreateCartService>(
    "CreateCartService",
    CreateCartService,
);

container.registerSingleton<UpdateCartService>(
    "UpdateCartService",
    UpdateCartService,
);

container.registerSingleton<ICartProductRepository>(
    "CartProductRepository",
    CartProductRepository,
);

container.registerSingleton<CreateCartProductService>(
    "CreateCartProductService",
    CreateCartProductService,
);

container.registerSingleton<DeleteCartProductService>(
    "DeleteCartProductService",
    DeleteCartProductService,
);

container.registerSingleton<UpdateCartProductService>(
    "UpdateCartProductService",
    UpdateCartProductService,
);

container.registerSingleton<IVoucherRepository>(
    "VoucherRepository",
    VoucherRepository,
);

container.registerSingleton<GetVoucherByNameService>(
    "GetVoucherByNameService",
    GetVoucherByNameService,
);

container.registerSingleton<SimpleListCategoriesService>(
    "SimpleListCategoriesService",
    SimpleListCategoriesService,
);

container.registerSingleton<ICategoryRepository>(
    "CategoryRepository",
    CategoryRepository,
);

container.registerSingleton<CreateCategoryService>(
    "CreateCategoryService",
    CreateCategoryService,
);