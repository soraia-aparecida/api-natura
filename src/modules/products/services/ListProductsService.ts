import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../shared/errors/CustomError";
import { IProductRepository } from "../repositories/IProductRepository";
import { IListProductsDTO } from "../dtos/IListProductsDTO";
import { Product } from "../infra/typeorm/entities/Product";


@injectable()
class ListProductsService {
    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository,
    ) {
        console.info("Listing product - service");
    }

    public async execute(params: IListProductsDTO): Promise<Product[]> {
        try {
            const products = await this.productRepository.list(params)
            return products;

        } catch (error: any) {
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error));
        }
    }
}

export { ListProductsService };