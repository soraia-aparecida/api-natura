import "reflect-metadata"
import { FakeUserRepository } from "../../users/repositories/fake/FakeUserRepositoty";
import { Cart } from "../infra/typeorm/entities/Cart";
import { FakeCartRepository } from "../repositories/fake/FakeCartRepository";
import { CartProduct } from '../../cartsProducts/infra/typeorm/entities/CartProduct';

describe('UpdateService', () => {
    let fakeCartRepository: FakeCartRepository;
    let fakeUserRepository: FakeUserRepository;

    beforeEach(() => {
        fakeCartRepository = new FakeCartRepository();
        fakeUserRepository = new FakeUserRepository();
    });

    jest.setTimeout(114200 * 1000);

    let cart = new Cart();

    cart = {
        ...cart,
        id: 1,
        user_id: 1,
        paid: false,
        pay_day: null,
        created_at: new Date('2024-07-12T17:00:31.259Z'),
        updated_at: new Date('2024-07-12T17:00:31.259Z'),
        deleted_at: null,
        items: [new CartProduct()]
    }

    it("must be able to update a cart", async () => {

        const result = await fakeCartRepository.update({
            paid: true
        })

        expect(result).toEqual("Success")
    });

    it("must be missing if the cart cannot be found", async () => {

        const result = await fakeCartRepository.findById(10);

        expect(result).toEqual(undefined)
    });

    it("must be missing if the logged in user is not the owner of that cart", async () => {

        async function verifyUser(userId: number) {
            if (userId !== cart.user_id) {
                return `Ação não permitida`

            } else {
                return await fakeCartRepository.update({
                    paid: true
                });
            }
        }

        verifyUser(158).then(data => {
            expect(data).toBe("Ação não permitida");
        });
    });
});