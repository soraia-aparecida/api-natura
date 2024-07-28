interface IUpdateCartDTO {
    id: number;
    paid: boolean;
    userId: number;
    payDay?: Date;
}

export { IUpdateCartDTO };