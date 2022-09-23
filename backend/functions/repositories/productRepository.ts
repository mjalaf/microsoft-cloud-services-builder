import { getCosmosDBContainer } from "../shared/cosmosDBContext";
import { IProduct } from "../shared/interfaces";

export async function getAllProductsfromCosmosDb() : Promise<IProduct[]>
{
    const { container }  = await getCosmosDBContainer();

    const { resources } = await  container.items.query("SELECT c.id,c.name, c.parent, c.description,c.documents,c.link, c.image, c.azureCLICommand, c.learnContent, c.relatedServices  from c WHERE c.partitionKey = 'AzureResource'")
        .fetchAll();

    return resources;
}

export async function getProductsByProdCategoryIdfromCosmosDb(prodCategoryID :String) : Promise<IProduct[]>
{
    const { container }  = await getCosmosDBContainer();

    const { resources } =  await container.items
            .query({
                query: "SELECT c.id,c.name, c.parent, c.description,c.documents,c.link, c.image, c.azureCLICommand, c.learnContent, c.relatedServices  from c WHERE c.partitionKey = 'AzureResource' AND c.parent = @parent",
                parameters: [{ name: "@parent", value: prodCategoryID }]
            })
            .fetchAll();

     return resources;
}

export async function getProductsByIdfromCosmosDb(productID :String) : Promise<IProduct[]>
{
    const { container }  = await getCosmosDBContainer();

    const { resources } =   await container.items
    .query({
        query: "SELECT c.id, c.name, c.parent, c.description,c.documents,c.link, c.image, c.azureCLICommand, c.learnContent, c.relatedServices  from c WHERE c.partitionKey = 'AzureResource' AND c.id = @id",
        parameters: [{ name: "@id", value: productID }]
    })
    .fetchAll();

   return resources;
}