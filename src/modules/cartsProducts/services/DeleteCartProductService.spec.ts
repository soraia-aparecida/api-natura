import "reflect-metadata"
import { FakeCartProductRepository } from "../repositories/fake/FakeCartProductRepository";

describe('DeleteCartProductService', () => {
    let fakeCartProductRepository: FakeCartProductRepository;

    beforeEach(() => {
        fakeCartProductRepository = new FakeCartProductRepository();
    });

    jest.setTimeout(114200 * 1000);

    it("should be able to delete a cartProduct", async () => {

        const result = await fakeCartProductRepository.softDelete(1);

        expect(result).toEqual("Success");
    });
});