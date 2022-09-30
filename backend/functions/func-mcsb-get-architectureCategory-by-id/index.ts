import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getArchitectureCategoryById } from "../services/architectureService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
try 
    {
        var id = context.bindingData.id;

        let productCategories = await getArchitectureCategoryById(id);

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