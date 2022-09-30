import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {  upsertProduct } from "../services/productService";
import { IProduct } from "../shared/interfaces";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    //const name = (req.query.name || (req.body && req.body.name));
    try {
    
        const product : IProduct =  JSON.parse(req.rawBody);

        let result = await upsertProduct(product);

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