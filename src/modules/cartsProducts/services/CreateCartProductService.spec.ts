import "reflect-metadata"
import { CartProduct } from '@modules/cartsProducts/infra/typeorm/entities/CartProduct';
import { FakeCartRepository } from "@modules/carts/repositories/fake/FakeCartRepository";
import { FakeCartProductRepository } from "../repositories/fake/FakeCartProductRepository";
import { FakeProductRepository } from "@modules/products/repositories/fake/FakeProductRepository";

describe('CreateCartProductService', () => {
    let fakeCartProductRepository: FakeCartProductRepository;
    let fakeCartRepository: FakeCartRepository;
    let fakeProductRepository: FakeProductRepository;

    beforeEach(() => {
        fakeCartProductRepository = new FakeCartProductRepository();
        fakeCartRepository = new FakeCartRepository();
        fakeProductRepository = new FakeProductRepository();
    });

    jest.setTimeout(114200 * 1000);

    let cartProduct = new CartProduct();

    cartProduct = {
        ...cartProduct,
        id: 1,
        cart_id: 1,
        product_id: 1,
        quantity: 2,
        created_at: new Date('2024-07-12T17:00:31.259Z'),
        updated_at: new Date('2024-07-12T17:00:31.259Z'),
        deleted_at: null,
    }

    const body = {
        cart_id: 1,
        product_id: 1,
        quantity: 2
    }

    it("must be able to create a new cartProduct", async () => {

        const result = await fakeCartProductRepository.create(body);

        expect(result).toEqual(cartProduct);
    });

    it("must be missing if the cart cannot be found", async () => {

        async function verifyCart(id: number) {

            const resultCart = await fakeCartRepository.findById(id);

            if (resultCart === undefined) {
                return `Carrinho não encontrado.`

            } else {
                return await fakeCartProductRepository.create(body);
            }
        }

        verifyCart(187455474).then(data => {
            expect(data).toBe("Carrinho não encontrado.");
        });
    });

    it("must be missing if the product cannot be found", async () => {

        async function verifyProduct(id: number) {

            const resultProduct = await fakeProductRepository.findById(id);

            if (resultProduct === undefined) {
                return `Produto não encontrado.`

            } else {
                return await fakeCartProductRepository.create(body);
            }
        }

        verifyProduct(187885).then(data => {
            expect(data).toBe("Produto não encontrado.");
        });
    });
});