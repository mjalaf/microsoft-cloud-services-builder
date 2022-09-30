import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getProductById } from "../services/productService";
import { IProduct } from "../shared/interfaces";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    //const name = (req.query.name || (req.body && req.body.name));
    try {
        var id = context.bindingData.id;

        let product : IProduct = await getProductById(id);
    
        context.res = {
            headers: {
                "Content-Type": "application/json",
            },
            
            body: product[0]
        };
        
    } catch (error) {
        
        context.res = {
            status: 500, 
            body: error
        };
    }


};

export default httpTrigger;