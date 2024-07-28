interface ICreateProductDTO {
    name: string;
    shortDescription: string;
    longDescription: string;
    composition: string;
    value: number;
    inStock: boolean;
    urlImage: string;
    categoryId: number;
}

export { ICreateProductDTO };