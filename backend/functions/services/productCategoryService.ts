import { getProductsCategoryfromCosmosDb } from "../repositories/productCategoryRepository";
import { IProductCategory } from "../shared/interfaces";

export async function getProductsCategory() : Promise<IProductCategory[]>
{
    return getProductsCategoryfromCosmosDb();
}