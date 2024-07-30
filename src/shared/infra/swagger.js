const swaggerAutogen = require("swagger-autogen");

require("dotenv/config");

const outputFile = "./src/shared/infra/swagger.json";
const endpointsFiles = [
  "src/modules/users/infra/http/routes/user.routes.ts",
  "src/modules/carts/infra/http/routes/cart.routes.ts",
  "src/modules/cartsProducts/infra/http/routes/cartProduct.routes.ts",
  "src/modules/products/infra/http/routes/product.routes.ts",
  "src/modules/vouchers/infra/http/routes/voucher.routes.ts",
  "src/modules/categories/infra/http/routes/category.routes.ts",
];

const doc = {
  info: {
    version: "1.0.0",
    title: "API - Soraia",
    description: "API de Backend para o Teste Natura.",
  },
  host: process.env.BASE_API_URL?.replace(/(^\w+:|^)\/\//, ""),
  basePath: "/",
  schemes: ["https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  definitions: {},
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
