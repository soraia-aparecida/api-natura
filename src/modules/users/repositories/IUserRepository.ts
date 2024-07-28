import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<User>;
    update(data: Partial<User>): Promise<string>;
    findById(id: number): Promise<User | undefined>;
    softDelete(id: number): Promise<string>;
    findByEmail(email: string): Promise<User | undefined>;
};

export { IUserRepository };