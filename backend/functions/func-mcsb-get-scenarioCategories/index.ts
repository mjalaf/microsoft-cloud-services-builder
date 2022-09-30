import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getScenarioCategories } from "../services/scenarioService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        let productCategories = await getScenarioCategories();
    
        context.res = {
            status: 200, 
            headers: {
                "Content-Type": "application/json",
            },
            body: productCategories
        };
    } catch (error) {
        
        context.res = {
            status: 500, 
            body: error
        };
    }
};

export default httpTrigger;