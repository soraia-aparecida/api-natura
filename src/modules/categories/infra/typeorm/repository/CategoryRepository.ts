
import { getRepository, Repository } from "typeorm";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";
import { Category } from "../entities/Category";
import { ICreateCategoryDTO } from "../../../dtos/ICreateCategoryDTO";
import { IListCategoriesDTO } from "../../../dtos/IListCategoriesDTO";
import { CustomError } from "../../../../../shared/errors/CustomError";

class CategoryRepository implements ICategoryRepository {
    private ormRepository: Repository<Category>;

    constructor() {
        this.ormRepository = getRepository(Category);
    }

    public async create(data: ICreateCategoryDTO): Promise<Category> {
        try {
            const category = this.ormRepository.create(data);
            await this.ormRepository.save(category);
            return category;

        } catch (error) {
            console.error("Error creating a new category", JSON.stringify(error))
            throw new CustomError(JSON.stringify(error));
        }
    }

    public async findById(id: number): Promise<Category | undefined> {
        try {
            const category = await this.ormRepository.findOne({
                where: {
                    id
                }
            });

            return category;
        } catch (error) {
            console.error("Error listing category by id", JSON.stringify(error))
            throw new CustomError(JSON.stringify(error));
        }
    }

    public async list(params: IListCategoriesDTO): Promise<Category[]> {
        try {
            const { page, perPage, text } = params;

            let query = this.ormRepository
                .createQueryBuilder("c")
                .select(["c"])

            if (!!text) {
                query = query.where("LOWER(c.name) like :search", { search: `%${text.toLowerCase()}%` })
            };

            query.orderBy("c.id", "DESC")

            const take = perPage || 10;
            const skip = (page - 1) * take;

            const categories = await query.skip(skip).take(take).getMany();
            return categories;

        } catch (error) {
            console.error("Error listing categories", JSON.stringify(error))
            throw new CustomError(JSON.stringify(error));
        }
    }

    public async simpleList(): Promise<Category[]> {
        try {

            let query = this.ormRepository
                .createQueryBuilder("c")
                .select(["c"])

            const categories = await query.getMany();
            return categories;

        } catch (error) {
            console.error("Error simple list categories", JSON.stringify(error))
            throw new CustomError(JSON.stringify(error));
        }
    }

    public async softDelete(id: number): Promise<string> {
        try {
            await this.ormRepository.softDelete(id);
            return "Success";

        } catch (error) {
            console.error("Error deleting category by id", JSON.stringify(error))
            throw new CustomError(JSON.stringify(error));
        }
    }

    public async update(data: Partial<Category>): Promise<string> {
        try {
            const result = await this.ormRepository.update(data.id!, {
                ...(data.name && { name: data.name }),
            });

            console.debug({ "result update category": result });

            return "Success";
        } catch (error) {
            console.error("Error updating category by id", JSON.stringify(error));
            throw new CustomError(JSON.stringify(error));
        }
    }

    public async findByName(name: string): Promise<Category | undefined> {
        try {
            const query = this.ormRepository
                .createQueryBuilder("c")
                .where("LOWER(c.name) = :name", {
                    name: `%${name.toLowerCase()}%`,
                });

            const category = await query.getOne();
            return category;

        } catch (error) {
            console.error("Error get category by name", JSON.stringify(error));
            throw new CustomError(JSON.stringify(error));
        }
    }
}

export { CategoryRepository };