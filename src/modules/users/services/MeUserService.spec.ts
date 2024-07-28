import "reflect-metadata"
import { FakeUserRepository } from "@modules/users/repositories/fake/FakeUserRepositoty";
import { User } from "../infra/typeorm/entities/User";

describe('MeUserService', () => {
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

    it("must be able to get user", async () => {

        const result = await fakeUserRepository.findById(1);

        expect(result).toEqual(user)
    });

    it("should fail if there is no user with that id", async () => {

        async function verifyUser(id: number) {
            const checkUser = await fakeUserRepository.findById(id);

            if (!checkUser) {
                return "Usuário não encontrado"

            } else {
                return await fakeUserRepository.findById(id);
            }
        }

        verifyUser(7895).then(data => {
            expect(data).toBe("Usuário não encontrado");
        });
    });
});