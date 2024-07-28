import "reflect-metadata"
import { FakeCartProductRepository } from "../repositories/fake/FakeCartProductRepository";

describe('UpdateCartProductService', () => {
    let fakeCartProductRepository: FakeCartProductRepository;

    beforeEach(() => {
        fakeCartProductRepository = new FakeCartProductRepository();
    });

    jest.setTimeout(114200 * 1000);

    const body = {
        id: 1,
        quantity: 5
    }

    it("should be able to update a cartProduct", async () => {

        const result = await fakeCartProductRepository.update(body);

        expect(result).toEqual("Success");
    });

    it("must be missing if the cartProduct cannot be found", async () => {

        async function verifyCartProduct(id: number) {

            const resultCartProduct = await fakeCartProductRepository.findById(id);

            if (resultCartProduct === undefined) {
                return `Item não encontrado.`

            } else {
                return await fakeCartProductRepository.update(body);
            }
        }

        verifyCartProduct(187455474).then(data => {
            expect(data).toBe("Item não encontrado.");
        });
    });
});