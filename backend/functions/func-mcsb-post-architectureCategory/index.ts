import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { upsertArchitectureCategory } from "../services/architectureService";
import { IProductCategory } from "../shared/interfaces";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        
        const architectureCategory : IProductCategory =  JSON.parse(req.rawBody);

        let result = await upsertArchitectureCategory(architectureCategory);
        
        context.res = {
            status: 200, 
            headers: {
                "Content-Type": "application/json",
            },
            body: result
        };
    } catch (error) {
        
        context.res = {
            status: 500, 
            body: error
        };
    }
};

export default httpTrigger;