import "reflect-metadata"
import { FakeCategoryRepository } from "../repositories/fake/FakeCategoryRepository";
import { Category } from "../infra/typeorm/entities/Category";

describe('SimpleListCategoriesService', () => {
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

    it("must be able to list the categories", async () => {

        const result = await fakeCategoryRepository.list({
            page: 1,
            perPage: 10
        })

        const categories = [category, category2];
        expect(result).toEqual(categories);
    });
});