import { getCosmosDBContainer } from "../shared/cosmosDBContext";
import { IProductCategory } from "../shared/interfaces";

export async function getProductsCategoryfromCosmosDb() : Promise<IProductCategory[]>
{
    const { container }  = await getCosmosDBContainer();

    const { resources } = await container.items.query("SELECT c.id,c.name,c.description,c.cssClass,c.link from c WHERE c.partitionKey = 'ProductCategory'")
       .fetchAll();
    return resources;
}

export async function getProductCategoryByIdfromCosmosDb(id: string) : Promise<IProductCategory>
{
    const { container }  = await getCosmosDBContainer();

    const querySpec = {
        query: "SELECT c.id,c.name,c.description,c.cssClass,c.link from c WHERE c.partitionKey = 'ProductCategory' AND c.id=@id",
        parameters: [
          {
            name: "@id",
            value: id
          }
        ]
      };
    

    const { resources } = await container.items.query(querySpec)
    .fetchAll();

    return resources;
}

export async function upsertCategoryCosmosDb(productCategory: IProductCategory) : Promise<string>
{
    const { container }  = await getCosmosDBContainer();
    const { resource } = await container.items.upsert(productCategory);

    return resource;
}