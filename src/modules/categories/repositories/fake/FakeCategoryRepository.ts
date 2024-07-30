import "reflect-metadata"
import { injectable } from "tsyringe";
import { ICategoryRepository } from "../ICategoryRepository";
import { Category } from "../../../categories/infra/typeorm/entities/Category";
import { ICreateCategoryDTO } from "../../../categories/dtos/ICreateCategoryDTO";
import { IListCategoriesDTO } from "../../../categories/dtos/IListCategoriesDTO";

@injectable()
class FakeCategoryRepository implements ICategoryRepository {

    private categories: Category[] = [];
    private category = {
        ...this.categories[0],
        id: 1,
        name: "Cabelos",
        created_at: new Date('2024-07-12T17:00:31.259Z'),
        updated_at: new Date('2024-07-12T17:00:31.259Z'),
        deleted_at: null,
    };

    private category2 = {
        ...this.category,
        id: 25,
        name: "Pele"
    };

    public async create(data: ICreateCategoryDTO): Promise<Category> {
        return this.category;
    }

    public async findByName(name: string): Promise<Category | undefined> {
        if (name.toLocaleLowerCase() === this.category.name.toLocaleLowerCase()) {
            return this.category;
        } else {
            return undefined
        }
    }

    public async findById(id: number): Promise<Category | undefined> {
        if (id === this.category.id) {
            return this.category;
        } else {
            return undefined
        }
    }

    public async softDelete(id: number): Promise<string> {
        return "Success";
    }

    public async update(data: Partial<Category>): Promise<string> {
        return "Success";
    }

    public async list(params: IListCategoriesDTO): Promise<Category[]> {
        this.categories.push(this.category, this.category2);
        return this.categories;
    }

    public async simpleList(): Promise<Category[]> {
        this.categories.push(this.category, this.category2);
        return this.categories;
    }
}

export { FakeCategoryRepository };
