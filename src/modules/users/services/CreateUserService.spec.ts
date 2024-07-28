import "reflect-metadata"
import { FakeUserRepository } from "@modules/users/repositories/fake/FakeUserRepositoty";
import { User } from "../infra/typeorm/entities/User";

describe('CreateUserService', () => {
    let fakeUserRepository: FakeUserRepository;

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
    });

    jest.setTimeout(114200 * 1000);

    let user = new User();

    user = {
        ...user,
        id: 1,
        profile: "user",
        name: "Soraia",
        is_guest: true,
        email: null,
        password: null,
        created_at: new Date('2024-07-12T17:00:31.259Z'),
        updated_at: new Date('2024-07-12T17:00:31.259Z'),
        deleted_at: null,
    }

    const body = {
        is_guest: true,
        profile: "user"
    }

    it("must be able to create a new user", async () => {

        const result = await fakeUserRepository.create(body)

        expect(result).toEqual(user)
    });

    it("should fail if a user with the same e-mail address already exists", async () => {

        async function verifyUser(email: string) {
            const checkUser = await fakeUserRepository.findByEmail(email);

            if (checkUser) {
                return "E-mail não disponível"

            } else {
                return await fakeUserRepository.create(body)
            }
        }

        verifyUser("soraia@gmail.com").then(data => {
            expect(data).toBe("E-mail não disponível");
        });
    });
});