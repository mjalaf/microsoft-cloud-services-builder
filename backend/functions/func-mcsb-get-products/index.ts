import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { processProductRequest } from "../services/productService";
import { IProduct } from "../shared/interfaces";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    //const name = (req.query.name || (req.body && req.body.name));
    try {
        let products : IProduct[] = await processProductRequest(req.query);
    
       

        context.res = {
            headers: {
                "Content-Type": "application/json",
            },
            
            body: (products.length === 1  ? products[0] :products )
        };
        
    } catch (error) {
        
        context.res = {
            status: 500, 
            body: error
        };
    }


};

export default httpTrigger;