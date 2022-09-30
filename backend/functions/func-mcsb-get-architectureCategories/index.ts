import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getArchitectureCategories } from "../services/architectureService";
import { IProductCategory } from "../shared/interfaces";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        let architectureCategories = await getArchitectureCategories();
    
        context.res = {
            status: 200, 
            headers: {
                "Content-Type": "application/json",
            },
            body: architectureCategories
        };
    } catch (error) {
        
        context.res = {
            status: 500, 
            body: error
        };
    }
};

export default httpTrigger;