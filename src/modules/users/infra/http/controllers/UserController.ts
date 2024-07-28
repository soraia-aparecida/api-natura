import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "../../../services/CreateUserService";

class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { isGuest, profile, password, email, name } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            is_guest: isGuest,
            profile,
            password,
            email,
            name
        });

        return response.status(201).json(user);
    }
}

export { UserController };