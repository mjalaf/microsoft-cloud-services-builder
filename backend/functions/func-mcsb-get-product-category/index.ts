import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getProductsCategory } from "../services/productCategoryService";
import { IProductCategory } from "../shared/interfaces";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        let productCategories : IProductCategory[] = await getProductsCategory();
    
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