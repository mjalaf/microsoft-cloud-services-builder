import { getCosmosDBContainer } from "../shared/cosmosDBContext";
import { IProduct } from "../shared/interfaces";

export async function getAllProductsfromCosmosDb() : Promise<IProduct[]>
{
    const { container }  = await getCosmosDBContainer();

    return container.items.query("SELECT c.id,c.name, c.description,c.documents,c.link, c.image, c.azureCLICommand, c.learnContent, c.relatedServices  from c WHERE c.partitionKey = 'AzureResource'")
        .fetchAll();
}

export async function getProductsByProdCategoryIdfromCosmosDb(prodCategoryID :String) : Promise<IProduct[]>
{
    const { container }  = await getCosmosDBContainer();

    return   await container.items
            .query({
                query: "SELECT c.id,c.name, c.description,c.documents,c.link, c.image, c.azureCLICommand, c.learnContent, c.relatedServices  from c WHERE c.partitionKey = 'AzureResource' AND c.parent = @parent",
                parameters: [{ name: "@parent", value: prodCategoryID }]
            })
            .fetchAll();
}

export async function getProductsByIdfromCosmosDb(productID :String) : Promise<IProduct[]>
{
    const { container }  = await getCosmosDBContainer();

    return   await container.items
    .query({
        query: "SELECT c.id, c.name,c.description,c.documents,c.link, c.image, c.azureCLICommand, c.learnContent, c.relatedServices  from c WHERE c.partitionKey = 'AzureResource' AND c.id = @id",
        parameters: [{ name: "@id", value: productID }]
    })
    .fetchAll();
}