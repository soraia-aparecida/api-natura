import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { IListCategoriesDTO } from "../dtos/IListCategoriesDTO";
import { Category } from "../infra/typeorm/entities/Category";

interface ICategoryRepository {
    create(data: ICreateCategoryDTO): Promise<Category>;
    list(params: IListCategoriesDTO): Promise<Category[]>;
    findById(id: number): Promise<Category | undefined>;
    update(data: Partial<Category>): Promise<string>;
    softDelete(id: number): Promise<string>;
    findByName(name: string): Promise<Category | undefined>;
    simpleList(): Promise<Category[]>;
}

export { ICategoryRepository };