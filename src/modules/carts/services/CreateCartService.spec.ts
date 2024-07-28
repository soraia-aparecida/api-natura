import "reflect-metadata"
import { FakeUserRepository } from "@modules/users/repositories/fake/FakeUserRepositoty";
import { Cart } from "../infra/typeorm/entities/Cart";
import { FakeCartRepository } from "../repositories/fake/FakeCartRepository";
import { CartProduct } from '@modules/cartsProducts/infra/typeorm/entities/CartProduct';

describe('CreateCartService', () => {
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

    it("must be able to create a new cart", async () => {
       
        const result = await fakeCartRepository.create({
            paid: false,
            user_id: 1
        })

        expect(result).toEqual(cart)
    });

    it("must be missing if the user cannot be found", async () => {
       
        const email = "soraia123@gmail.com";

        const result = await fakeUserRepository.findByEmail(email);

        expect(result).toEqual(undefined)
    });
});