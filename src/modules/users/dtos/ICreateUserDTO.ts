interface ICreateUserDTO {
    is_guest: boolean;
    profile: string;
    password?: string;
    email?: string;
    name?: string;
}

export { ICreateUserDTO };