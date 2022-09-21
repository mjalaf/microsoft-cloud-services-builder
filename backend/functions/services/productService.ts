import { getAllProductsfromCosmosDb, getProductsByIdfromCosmosDb, getProductsByProdCategoryIdfromCosmosDb } from "../repositories/productRepository";
import { IProduct } from "../shared/interfaces";

export async function processProductRequest(queryString): Promise<IProduct[]>
{

if (queryString.id != undefined || queryString.category != null )
    {
        const id = queryString.id;
       
        if (id != undefined)
            return getProductsByIdfromCosmosDb(id);

        const category = queryString.category;
        
        if (category != undefined)
            return getProductsByProdCategoryIdfromCosmosDb(category)
    }
    else
      return  getAllProductsfromCosmosDb();

    return null;

}

/*
async function getAllProducts() : Promise<IProduct[]>
{
    return getAllProductsfromCosmosDb();
}

 async function getProductsByProdCategoryId(prodCategoryID :String) : Promise<IProduct[]>
{
    return getProductsByProdCategoryIdfromCosmosDb(prodCategoryID);
}

 async function getProductsById(productID :String) : Promise<IProduct[]>
{
    return getProductsByIdfromCosmosDb(productID);
}
*/