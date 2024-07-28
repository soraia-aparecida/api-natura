interface IUpdateUserDTO {
    id: number;
    isGuest: boolean;
    profile: string;
    email?: string;
    name?: string;
}

export { IUpdateUserDTO };