import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getScenarioCategoryById } from "../services/scenarioService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
try 
    {
        var id = context.bindingData.id;

        let productCategories = await getScenarioCategoryById(id);

        context.res = {
            status: 200, 
            headers: {
                "Content-Type": "application/json",
            },
            body: productCategories[0]
        };
    } catch (error) {
        
        context.res = {
            status: 500, 
            body: error
        };
    }
};

export default httpTrigger;