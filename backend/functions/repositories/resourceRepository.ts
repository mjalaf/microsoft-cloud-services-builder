import { getCosmosDBContainer } from "../shared/cosmosDBContext";
import { IArchitecture, IProduct } from "../shared/interfaces";

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

export async function getProductByIdfromCosmosDb(productID :String) : Promise<IProduct>
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

export async function upsertProductCosmosDb(product: IProduct) : Promise<string>
{
    const { container }  = await getCosmosDBContainer();
    const { resource } = await container.items.upsert(product);

    return resource;
}

export async function upsertArchitectureCosmosDb(product: IArchitecture) : Promise<string>
{
    const { container }  = await getCosmosDBContainer();
    const { resource } = await container.items.upsert(product);

    return resource;
}


export const resourceRepository = {

    getAllProductsfromCosmosDb,
    getProductsByProdCategoryIdfromCosmosDb,
    getProductByIdfromCosmosDb,
    upsertProductCosmosDb,
    upsertArchitectureCosmosDb
  }