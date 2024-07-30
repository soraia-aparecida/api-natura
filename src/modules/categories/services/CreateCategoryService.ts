import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../shared/errors/CustomError";
import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

@injectable()
class CreateCategoryService {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository,
    ) {
        console.info("Creating category - service")
    }

    public async execute(data: ICreateCategoryDTO) {
        try {

            const category = await this.categoryRepository.findByName(data.name);
            if (category) {
                throw new CustomError("Já existe uma categoria com esse nome", 409);
            }

            const newCategory = await this.categoryRepository.create(data);
            return newCategory;

        } catch (error: any) {
            const status = error?.statusCode ?? 400;
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error), status);
        }
    }
}

export { CreateCategoryService };