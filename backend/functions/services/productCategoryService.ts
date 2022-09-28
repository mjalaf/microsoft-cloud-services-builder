import { getProductCategoryByIdfromCosmosDb, getProductsCategoryfromCosmosDb, upsertCategoryCosmosDb } from "../repositories/productCategoryRepository";
import { IProductCategory } from "../shared/interfaces";

export function getProductsCategory() : Promise<IProductCategory[]>
{
    return getProductsCategoryfromCosmosDb();
}

export function getProductByCategory(id : string) : Promise<IProductCategory>
{
    return getProductCategoryByIdfromCosmosDb(id);
}

export function upsertProductCategory(productCategory : IProductCategory) : Promise<string>
{
    return upsertCategoryCosmosDb(productCategory);
}
