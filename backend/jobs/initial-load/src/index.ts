import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/configuration.env' });


import { parse } from 'node-html-parser';
import { appendFullAzureURL, extImageNameAndExtenstion, readFile } from "./shared/utility";
import { IService, IServiceCategory,IProductCategory, IProduct, IDocument } from "./shared/interfaces";
//import { env } from "process";
const request = require('request-promise-native')
const { CosmosClient } = require("@azure/cosmos");

let mapImage = new Map<string, string>()
let services : IService[]
let serviceCategories : IServiceCategory[]

async function run(): Promise<void> {
    console.log("Starting Initial CosmosDB Load Process....");

    console.log("Print local variables:");
    console.log("Path:" + __dirname )
    console.log("Cosmos DB URL:" +  process.env.COSMOS_DB_ENDPOINT)
    console.log("Cosmos DB DataBase Name:" + process.env.COSMOS_DB_DATABASE_NAME )
    console.log("Cosmos DB Container Name:" + process.env.COSMOS_DB_CONTAINER_NAME )

    console.log("Exctract Public SVC url");
    await extractPublicImagesURL();

    console.log("Read Services information from Json File");
    await readJsonServices();

    console.log("Read Services Category information from Json File");
    await readJsonServicesCategory();

    console.log("HTML Scraping from Public Microsoft site, merge the inforation with the Json Files and Populate CosmosDB");
    htmlScrapingFromLocalFileMergeInforamtionAndPopulateCosmosDB();

    console.log("Initial Load Process has Ended...");


};

async function htmlScrapingFromLocalFileMergeInforamtionAndPopulateCosmosDB()
{
    let data = await readFile(__dirname + '/assets/DirectoryOfAzureCloudService.html');

    const root = parse(data.toString());
    const products =  root.querySelectorAll("#products");

    let productsStructure = new Array() 

    for (let index = 0; index < products.length; index++) {
        const currentNode = products[index];
        productsStructure.push(processProducts(currentNode,index));
    }
}

async function processProducts(product, prodCatIndex)  
{
    const pordCategoryID="AZPRODCAT-" + prodCatIndex;
    let productCategory: IProductCategory = {
        id: pordCategoryID,
        partitionKey: "ProductCategory",
        name: product.querySelector(".product-category").text.trim(),
        description:     product.querySelector(".column .medium-9 p").text.trim(),
        link:  appendFullAzureURL(product.querySelector(".arrow-link").attrs["href"].toString()),
    }

    const servCat : IServiceCategory = findServiceCategoryObjectByProductdCategoryName(productCategory.name);

    if (servCat != null)
        productCategory.cssClass = servCat.cssClass === undefined ? "bg-gn" : servCat.cssClass;

    createProdCategoryInCosmosDB(productCategory);

    const servicesNames =   product.querySelectorAll(".text-heading5");
    const servicesDescriptions =   product.querySelectorAll(".text-body4");
    const servicesLinks =   product.querySelectorAll(".text-heading5 a");
    const i = servicesNames.length;

    for (let index = 0; index < i; index++) {
        let product : IProduct = {
            id: "AZPROD-"+ prodCatIndex +"-"+ index,
            parent: pordCategoryID,
            partitionKey: "AzureResource",
            name: servicesNames[index].text.trim(),
            description: servicesDescriptions[index].text.trim(),
            link:  appendFullAzureURL(servicesLinks[index].attrs["href"].toString())
        }

        const service :IService  =  findServiceObjectByProductdName(product.name);
    
        try {
       
            if (service != null){
                product.image = mapImage.get(service.image); 
                product.documents = service.documents === undefined ? null : service.documents;
                product.azureCLICommand = service.azureCLICommand === undefined ? null : service.azureCLICommand;
                product.learnContent = service.learnContent === undefined ? null : service.learnContent;
                product.relatedServices = service.relatedServices === undefined ? null : service.relatedServices;
            }

            if (product.documents == null || product.documents.length == 0)
            {
                let overviewDocument : IDocument = {
                 name: product.name +  " Overview",
                 url: product.link   
                }

                product.documents = new Array();
                product.documents.push(overviewDocument);
            }

            
        } catch (error) {
            console.log("Error trying to add images and css class")
        }

        createProductInCosmosDB(product);
  
    }

    return productCategory;
}

async function extractPublicImagesURL() {
    const res = await request('https://learn.microsoft.com/en-us/azure/?product=all')
    const root = parse(res);
    
    const mainContainer = root.querySelector('.mainContainer');
    const images =  mainContainer.querySelectorAll('img');
    
    for (let index = 0; index < images.length ; index++) {
        const imageURL = images[index].attrs["src"].toString();
      
        mapImage.set(extImageNameAndExtenstion(imageURL),imageURL)
    }
}
 
async function createProdCategoryInCosmosDB(prodCat: IProductCategory)
{
    const { container }  = await getCosmosDBContainer();

    container.items.create(prodCat);
 
}

async function createProductInCosmosDB(product: IProduct)
{
    const { container }  = await getCosmosDBContainer();

    container.items.create(product);
 
}

async function readJsonServices()
{
    const rawData = await readFile(__dirname + "/assets/services.json")
    services =  JSON.parse(rawData);
}

async function readJsonServicesCategory()
{
    const rawData = await readFile(__dirname + "/assets/serviceCategories.json")
    serviceCategories =  JSON.parse(rawData);
}
function findServiceObjectByProductdName(prodName: string)  
{
  return services.find(x => x.name == prodName)
}

function findServiceCategoryObjectByProductdCategoryName(categoryName: string)  
{
  return serviceCategories.find(x => x.name == categoryName)
}


async function getCosmosDBContainer()
{
    const endpoint =process.env.COSMOS_DB_ENDPOINT;
    const key = process.env.COSMOS_DB_KEY;

    const client = new CosmosClient({endpoint, key });

    const { database } = await client.databases.createIfNotExists({ id: process.env.COSMOS_DB_DATABASE_NAME });

    return await database.containers.createIfNotExists({ id: process.env.COSMOS_DB_CONTAINER_NAME });;
   
}


/*s
s
async function htmlScrapingFromWeb()
{
    try
    {
        const res = await request('https://azure.microsoft.com/en-us/products/')
        const root = parse(res);
    
    
        const productList =  root.querySelector('#products-list');
    
        // Producs
        const productNames =  productList.querySelectorAll(".product-category");
        const productsDescriptions = productList.querySelectorAll(".column .medium-9 p");  
        const productsLinks = productList.querySelectorAll(".arrow-link");
    
        var nodes = new Array();
    
        
        for (let index = 0; index < 5; index++) {
        //    let newNode: HtmlNode
    
            console.log(productNames[index].text);
            console.log(productsDescriptions[index].text);
         //   console.log(productsLinks[index].attrs["href"].toString());
         //   console.log(products[index].parentNode.nextElementSibling.attributes["href"].valueOf());
     
       //     nodes.push(newNode);
        }
        
        const servicesName =  productList.querySelectorAll(".text-heading5");
        const servicesDescription =  productList.querySelectorAll(".text-body4");
        const servicesLink =  productList.querySelectorAll(".text-heading5 a");
        
        for (let index = 0; index < 5 ; index++)     {
    
            if (servicesName[index].text.trim() == "")
            continue;
    
            console.log(servicesName[index].text.trim());
            console.log(servicesDescription[index].text.trim());
            console.log(servicesLink[index].attrs["href"].toString())
        }
    
    }
    catch(e)
    {
        return e;
    }

}
*/
run();