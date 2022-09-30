import { env } from "process";
const { CosmosClient } = require("@azure/cosmos");


export async function getCosmosDBContainer()
{
    const endpoint =env.COSMOS_DB_ENDPOINT;
    const key = env.COSMOS_DB_KEY;

    const client = new CosmosClient({endpoint, key });

    const { database } = await client.databases.createIfNotExists({ id: env.COSMOS_DB_DATABASE_NAME });

    return await database.containers.createIfNotExists({ id: env.COSMOS_DB_CONTAINER_NAME });;
    
}