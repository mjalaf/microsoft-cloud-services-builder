import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getProductCategoryById } from "../services/productCategoryService";
import { IProductCategory } from "../shared/interfaces";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
try 
    {
        var id = context.bindingData.id;

        let productCategories = await getProductCategoryById(id);

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