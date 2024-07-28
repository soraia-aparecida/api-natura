interface ICreateCartDTO {
    paid: boolean;
    user_id: number;
    voucher_id?: number
}

export { ICreateCartDTO };