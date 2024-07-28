import { ICreateCartProductDTO } from "../dtos/ICreateCartProductDTO";
import { CartProduct } from "../infra/typeorm/entities/CartProduct";

interface ICartProductRepository {
    create(data: ICreateCartProductDTO): Promise<CartProduct>;
    update(data: Partial<CartProduct>): Promise<string>;
    softDelete(id: number): Promise<string>;
    findById(id: number): Promise<CartProduct | undefined>;
}

export { ICartProductRepository };