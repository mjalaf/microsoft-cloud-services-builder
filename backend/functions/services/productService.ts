import { resourceRepository } from "../repositories/resourceRepository";
import { IProduct } from "../shared/interfaces";

export function upsertProduct(product : IProduct) : Promise<string>
{
    return resourceRepository.upsertProductCosmosDb(product);
}

export async function getAllProducts() : Promise<IProduct[]>
{
    return resourceRepository.getAllProductsfromCosmosDb();
}

export async function getProductsByCategoryId(prodCategoryID :String) : Promise<IProduct[]>
{
    return resourceRepository.getProductsByProdCategoryIdfromCosmosDb(prodCategoryID);
}

export async function getProductById(productID :String) : Promise<IProduct>
{
    return resourceRepository.getProductByIdfromCosmosDb(productID);
}
