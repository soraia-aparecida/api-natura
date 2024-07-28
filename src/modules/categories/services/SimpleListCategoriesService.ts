import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../repositories/ICategoryRepository";
import { Category } from "../infra/typeorm/entities/Category";
import { CustomError } from "../../../shared/errors/CustomError";


@injectable()
class SimpleListCategoriesService {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository,
    ) {
        console.info("Simple list category - service");
    }

    public async execute(): Promise<Category[]> {
        try {
            const routeStatus = await this.categoryRepository.simpleList();
            return routeStatus;

        } catch (error: any) {
            throw new CustomError(error?.message || error?.sqlMessage || JSON.stringify(error));
        }
    }
}

export { SimpleListCategoriesService };
