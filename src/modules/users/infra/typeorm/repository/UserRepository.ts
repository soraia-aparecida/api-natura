
import { getRepository, Repository } from "typeorm";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { User } from "../entities/User";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";

class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        try {

            const cart = this.ormRepository.create(data);
            await this.ormRepository.save(cart);
            return cart;

        } catch (error) {
            console.error("Error creating a new user", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async softDelete(id: number): Promise<string> {
        try {
            await this.ormRepository.softDelete(id);
            return "Success";

        } catch (error) {
            console.error("Error deleting user by id", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async findById(id: number): Promise<User | undefined> {
        try {
            const user = await this.ormRepository.findOne({
                where: {
                    id
                }
            });
            return user;

        } catch (error) {
            console.error("Error getting user by id", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async update(data: Partial<User>): Promise<string> {
        try {
            const result = await this.ormRepository.update(data.id!, {
                ...(data.is_guest && { is_guest: data.is_guest }),
                ...(data.profile && { profile: data.profile }),
                ...(data.name && { name: data.name })
            });

            console.debug({ "result update cart": result });
            return "Success";

        } catch (error) {
            console.error("Error updating cart by id", JSON.stringify(error));
            throw new Error(JSON.stringify(error));
        }
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        try {
            const user = await this.ormRepository.findOne({
                where: {
                    email
                }
            });
            return user;

        } catch (error) {
            console.error("Error getting user by email", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }
}

export { UserRepository };