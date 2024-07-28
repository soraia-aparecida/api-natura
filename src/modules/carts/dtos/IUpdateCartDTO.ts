interface IUpdateCartDTO {
    id: number;
    paid: boolean;
    userId: number;
    payDay?: Date;
    voucherId?:number
}

export { IUpdateCartDTO };