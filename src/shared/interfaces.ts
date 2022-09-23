export interface IServiceCategory {
    svcCat: () => Promise<IService[]>;
    id: string;
    name: string;
    serviceNames: string[];
    cssClass: string;
    services: IService[];
    scenenarios: IService[];
    architectures: IServiceArchitecture[];
}

export interface IService {
    id: string;
    name: string;
    description: string;
    parent: string;
    image: string;
    cssClass: string;
    category: string;
    relatedServices: string[];
    azureCLICommand: string[];
    documents: IDocument[];
    learnContent: ILearnContent[]
}

export interface IServiceScenario {
    id: string;
    name: string;
}

export interface IServiceArchitecture {
    id: string;
    name: string;
    description: string;
    relatedServices: string[];
    image: string;
    components: IComponent[];
}

export interface IComponent {
    id: string;
    name: string;
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

export type ServiceCategoryType = 'categories' | 'scenarios' | 'architecture';