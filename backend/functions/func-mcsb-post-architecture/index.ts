import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { upsertArchitecture } from "../services/architectureService";
import { IArchitecture } from "../shared/interfaces";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    //const name = (req.query.name || (req.body && req.body.name));
    try {
        const architecture : IArchitecture =  JSON.parse(req.rawBody);
    
        upsertArchitecture(architecture);

        context.res = {
            headers: {
                "Content-Type": "application/json",
            },
            
            body: architecture 
        };
        
    } catch (error) {
        
        context.res = {
            status: 500, 
            body: error
        };
    }


};

export default httpTrigger;