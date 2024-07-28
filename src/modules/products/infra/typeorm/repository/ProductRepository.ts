import { Brackets, getRepository, Repository } from "typeorm";
import { IProductRepository } from "../../../repositories/IProductRepository";
import { Product } from "../entities/Product";
import { ICreateProductDTO } from "../../../dtos/ICreateProductDTO";
import { IListProductsDTO } from "../../../dtos/IListProductsDTO";

class ProductRepository implements IProductRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product);
    }

    public async create(data: ICreateProductDTO): Promise<Product> {
        try {
            const product = this.ormRepository.create(data);
            await this.ormRepository.save(product);
            return product;

        } catch (error) {
            console.error("Error creating a new product", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async findById(id: number): Promise<Product | undefined> {
        try {
            const product = await this.ormRepository.findOne({
                where: {
                    id,
                },
                relations: ["category"]
            });

            return product;
        } catch (error) {
            console.error("Error listing product by id", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async list(params: IListProductsDTO): Promise<any> {
        try {
            const { categoryId, page, perPage, text } = params;

            let query = this.ormRepository
                .createQueryBuilder("p")
                .select(["p"])
                .where("p.in_stock = :in_stock", { in_stock: true })

            if (!!categoryId) {
                query = query.andWhere("p.category_id = :category_id", { category_id: categoryId})
            };

            if (!!text) {
                query = query.andWhere(
                    new Brackets(qb => {
                        qb.where("LOWER(p.name) like :search", { search: `%${text.toLowerCase()}%` })
                            .orWhere("LOWER(p.short_description) like :search", { search: `%${text.toLowerCase()}%` })
                            .orWhere("LOWER(p.long_description) like :search", { search: `%${text.toLowerCase()}%` })
                            .orWhere("LOWER(p.composition) like :search", { search: `%${text.toLowerCase()}%` })
                    })
                )
            };

            query.orderBy("p.id", "DESC")

            const take = perPage || 10;
            const skip = (page - 1) * take;

            const products = await query.skip(skip).take(take).getMany();
            return products;

        } catch (error) {
            console.error("Error listing products", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async softDelete(id: number): Promise<string> {
        try {
            await this.ormRepository.softDelete(id);
            return "Success";

        } catch (error) {
            console.error("Error deleting product by id", JSON.stringify(error))
            throw new Error(JSON.stringify(error));
        }
    }

    public async update(data: Partial<Product>): Promise<string> {
        try {
            const result = await this.ormRepository.update(data.id!, {
                ...(data.name && { name: data.name }),
                ...(data.short_description && { shortDescription: data.short_description }),
                ...(data.long_description && { longDescription: data.long_description }),
                ...(data.composition && { composition: data.composition }),
                ...(data.value && { value: data.value }),
                ...(data.in_stock && { inStock: data.in_stock }),
                ...(data.url_image && { urlImage: data.url_image }),
                ...(data.category_id && { categoryId: data.category_id })
            });

            console.debug({ "result update product": result });

            return "Success";
        } catch (error) {
            console.error("Error updating product by id", JSON.stringify(error));
            throw new Error(JSON.stringify(error));
        }
    }
}

export { ProductRepository };