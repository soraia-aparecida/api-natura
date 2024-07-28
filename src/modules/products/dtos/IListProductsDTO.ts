import { IPaginatedListing } from "../../../shared/utils/IPaginatedListing";

interface IListProductsDTO extends IPaginatedListing {
    categoryId?: number;
}

export { IListProductsDTO };