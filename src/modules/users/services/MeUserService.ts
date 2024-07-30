import { inject, injectable } from "tsyringe";
import { User } from "../infra/typeorm/entities/User";
import { IUserRepository } from "../repositories/IUserRepository";
import { CustomError } from "../../../shared/errors/CustomError";

@injectable()
class MeUserService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }
    public async execute(id: number): Promise<User> {
        try {

            const checkUser = await this.userRepository.findById(id)

            if (!checkUser) {
                throw new CustomError("Usuário não encontrado", 404);
            }

            return checkUser
        } catch (error: any) {
            const status = error?.statusCode ?? 400;
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error), status);
        }
    }
}

export { MeUserService };
