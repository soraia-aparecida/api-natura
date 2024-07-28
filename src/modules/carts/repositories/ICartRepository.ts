import { ICreateCartDTO } from "../dtos/ICreateCartDTO";
import { Cart } from "../infra/typeorm/entities/Cart";

interface ICartRepository {
    create(data: ICreateCartDTO): Promise<Cart>;
    update(data: Partial<Cart>): Promise<string>;
    findById(id: number, returnRelation?: boolean): Promise<Cart | undefined>;
    softDelete(id: number): Promise<string>;
};

export { ICartRepository };