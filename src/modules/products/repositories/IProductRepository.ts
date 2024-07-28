import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { IListProductsDTO } from "../dtos/IListProductsDTO";
import { Product } from "../infra/typeorm/entities/Product";


interface IProductRepository {
    create(data: ICreateProductDTO): Promise<Product>;
    list(params: IListProductsDTO): Promise<Product[]>;
    findById(id: number): Promise<Product | undefined>;
    update(data: Partial<Product>): Promise<string>;
    softDelete(id: number): Promise<string>;
}

export { IProductRepository };
