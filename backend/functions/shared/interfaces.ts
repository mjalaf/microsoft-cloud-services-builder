export interface ICategoryBase {
    id?: string;
    name: string;
    partitionKey?: string;
    cssClass: string;
    description: string;

}

export interface IResourceBase{
    id?: string;
    name: string;
    partitionKey: string;
    description: string;
    parent:string;
    image: string;
    cssClass: string;
    documents: IDocument[];
}

export interface IProductCategory extends ICategoryBase {
   
}

export interface IScenarioCategory extends ICategoryBase {
   
    components?: IResourceId[];

}

export interface IArchitectureCategory extends ICategoryBase {
   
    components?: IArchitecture[];
}


export interface IArchitecture extends IResourceBase {

    childs?: IResourceId[];
}


export interface IProduct extends IResourceBase {
    azureCLICommand: string[];
    learnContent: ILearnContent[]
}

interface IResourceId
{
    id:string;
}

export interface IDocument {
    name: string;
    url: string;
}

export interface ILearnContent extends IDocument {
    type: LearnType;
    image: string;
    modules: IDocument[]
}

export interface ICloudBlockData { 
    name: string, 
    cssClass?: string, 
    image?: string, 
    description?: string,
    showDeleteButton?: boolean
    deleteService?: (service: string) => void;
}

export type LearnType = 'path' | 'module';

export type ServiceCategoryType = 'categories' | 'scenarios';