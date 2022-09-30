import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { upsertScenarioCategory } from "../services/scenarioService";
import { IProductCategory } from "../shared/interfaces";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        
        const productCategory : IProductCategory =  JSON.parse(req.rawBody);

        let result = await upsertScenarioCategory(productCategory);
        
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