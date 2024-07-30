import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../shared/errors/CustomError";
import { IUserRepository } from "../../users/repositories/IUserRepository";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { HasManager } from "../../../shared/utils/HasManager";
import { Authentication } from "../../../shared/utils/Authentication";

@injectable()
class CreateUserService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("HasManager")
        private hasManager: HasManager,
        @inject("Authentication")
        private authentication: Authentication,
    ) {
        console.info("Create new user - service");
    }

    public async execute(data: ICreateUserDTO) {
        try {

            let { is_guest, profile, email, password, name} = data;

            if (!!email && !!password) {
                const checkUser = await this.userRepository.findByEmail(email);
                if (checkUser) {
                    throw new CustomError("E-mail não disponível", 409);
                }

                password = await this.hasManager.generateHash(password);
            }

            const checkUser = await this.userRepository.create({
                is_guest,
                profile,
                email,
                password,
                name
            });

            const user = {
                id: checkUser.id, profile: checkUser.profile
            }

            const token = this.authentication.generateToken({ user });
            return {
                user,
                token
            };

        } catch (error: any) {
            console.log("🚀 ~ CreateUserService ~ execute ~ error:", error)
            const status = error?.statusCode ?? 400;
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error), status);
        }
    }
};

export { CreateUserService };