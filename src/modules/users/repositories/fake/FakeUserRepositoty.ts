import "reflect-metadata"
import { injectable } from "tsyringe";
import { IUserRepository } from "../IUserRepository";
import { User } from "../../../users/infra/typeorm/entities/User";
import { ICreateUserDTO } from "../../../users/dtos/ICreateUserDTO";

@injectable()
class FakeUserRepository implements IUserRepository {

    private users: User[] = [];
    private user = {
        ...this.users[0],
        id: 1,
        profile: "user",
        name: "Soraia",
        is_guest: true,
        email: null,
        password: null,
        created_at: new Date('2024-07-12T17:00:31.259Z'),
        updated_at: new Date('2024-07-12T17:00:31.259Z'),
        deleted_at: null,
    };

    private user2 = {
        ...this.user,
        email: "soraia@gmail.com"
    };

    public async create(data: ICreateUserDTO): Promise<User> {
        return this.user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        if (email === this.user2.email) {
            return this.user;
        } else {
            return undefined
        }
    }

    public async findById(id: number): Promise<User | undefined> {
        if (id === this.user.id) {
            return this.user;
        } else {
            return undefined
        }
    }

    public async softDelete(id: number): Promise<string> {
        return "Success";
    }

    public async update(data: Partial<User>): Promise<string> {
        return "Success";
    }
}

export { FakeUserRepository };
