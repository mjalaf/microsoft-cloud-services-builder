import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getProductsCategory, upsertProductCategory } from "../services/productCategoryService";
import { IProductCategory } from "../shared/interfaces";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        
        const productCategory : IProductCategory =  JSON.parse(req.rawBody);

        let result = await upsertProductCategory(productCategory);
        
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