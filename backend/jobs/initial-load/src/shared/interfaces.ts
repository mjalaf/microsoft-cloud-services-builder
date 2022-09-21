import { RandomUUIDOptions } from "crypto";

export interface IProductCategory {
    id: string;
    name: string;
    description: string;
    link: string;
    partitionKey: string;
    cssClass?: string;
    products?: IProduct[];
}
export interface IProduct {
    id: string;
    name: string;
    description: string;
    image?: string;
    cssClass?: string;
    category?: string;
    partitionKey: string;
    link: string;
    parent: string;
    documents?: IDocument[];
    relatedServices?: string[];
    azureCLICommand?: string[];
    learnContent?: ILearnContent[]
}

export interface IServiceCategory {

    name: string;
    description: string;
    link: string;
    serviceNames?: string[];
    cssClass?: string;
    services?: IService[];
}

export interface IService {
    name: string;
    description: string;
    image?: string;
    cssClass?: string;
    category?: string;
    link: string;
    relatedServices?: string[];
    azureCLICommand?: string[];
    documents?: IDocument[];
    learnContent?: ILearnContent[]
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