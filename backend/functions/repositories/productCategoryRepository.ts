import { getCosmosDBContainer } from "../shared/cosmosDBContext";
import { IProductCategory } from "../shared/interfaces";

export async function getProductsCategoryfromCosmosDb() : Promise<IProductCategory[]>
{
    const { container }  = await getCosmosDBContainer();

    return container.items.query("SELECT c.id,c.name,c.description,c.cssClass,c.link from c WHERE c.partitionKey = 'ProductCategory'")
        .fetchAll();
    
}