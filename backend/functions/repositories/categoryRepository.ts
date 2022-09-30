import { getCosmosDBContainer } from "../shared/cosmosDBContext";
import { IProductCategory } from "../shared/interfaces";

async function getProductsFromSectionfromCosmosDb(section : string) : Promise<IProductCategory[]>
{
    const { container }  = await getCosmosDBContainer();

    const querySpec = {
      query: "SELECT c.id,c.name,c.description,c.cssClass,c.link from c WHERE c.partitionKey =@pk",
      parameters: [
        {
          name: "@pk",
          value: section
        }
      ]
    };

    const { resources } = await container.items.query("SELECT c.id,c.name,c.description,c.cssClass,c.link from c WHERE c.partitionKey = 'ProductCategory'")
       .fetchAll();
    return resources;
}

async function getCategoryByIdfromCosmosDb(id: string, section : string ) : Promise<IProductCategory>
{
    const { container }  = await getCosmosDBContainer();

    const querySpec = {
        query: "SELECT c.id,c.name,c.description,c.cssClass,c.link from c WHERE c.partitionKey =@pk AND c.id=@id",
        parameters: [
          {
            name: "@id",
            value: id
          },
          {
            name: "@pk",
            value: section
          }
        ]
      };
    

    const { resources } = await container.items.query(querySpec)
    .fetchAll();

    return resources;
}



async function upsertCategoryCosmosDb(productCategory: IProductCategory) : Promise<string>
{
    const { container }  = await getCosmosDBContainer();
    const { resource } = await container.items.upsert(productCategory);

    return resource;
}


export const categoryRepository = {

  getProductsFromSectionfromCosmosDb,
  getCategoryByIdfromCosmosDb,
  upsertCategoryCosmosDb
}