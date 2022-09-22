import { getProductsCategoryfromCosmosDb } from "../repositories/productCategoryRepository";
import { IProductCategory } from "../shared/interfaces";

export function getProductsCategory() : Promise<IProductCategory[]>
{
    return getProductsCategoryfromCosmosDb();
}