import "reflect-metadata"
import { FakeCategoryRepository } from "../repositories/fake/FakeCategoryRepository";
import { Category } from "../infra/typeorm/entities/Category";

describe('CreateCategoryService', () => {
    let fakeCategoryRepository: FakeCategoryRepository;

    beforeEach(() => {
        fakeCategoryRepository = new FakeCategoryRepository();
    });

    jest.setTimeout(114200 * 1000);

    let category = new Category();

    category = {
        ...category,
        id: 1,
        name: "Cabelos",
        created_at: new Date('2024-07-12T17:00:31.259Z'),
        updated_at: new Date('2024-07-12T17:00:31.259Z'),
        deleted_at: null,
    }

    const category2 = {
        ...category,
        id: 25,
        name: "Pele",
    }

    it("must be able to create a new category", async () => {

        const result = await fakeCategoryRepository.create({
            name: "Cabelos",
        })

        expect(result).toEqual(result)
    });

    it("should fail if a category with that name already exists", async () => {

        async function verifyCategory(name: string) {
            if (name.toLocaleLowerCase() === category.name.toLocaleLowerCase()) {
                return "Já existe uma categoria com esse nome";

            } else {
                return await fakeCategoryRepository.create({
                    name: "Unhas"
                });
            }
        }

        verifyCategory("Cabelos").then(data => {
            expect(data).toBe("Já existe uma categoria com esse nome");
        });
    });
});