export interface ICategory
{
    id: string;
    name: string;
    cssClass: string;
}
export interface ISectionCategory extends ICategory {
    svcCat: () => Promise<ISectionBase[]>;
    components: IComponent[];
 }


export interface ISectionBase {
    id: string;
    name: string;
    description?: string;
    cssClass?: string;
    image?: string;
    parent: string;
    azureCLICommand?: string[];
    documents?: IDocument[];
    learnContent?: ILearnContent[];
}

export interface IComponent extends ISectionBase
{
    childs : IChildComponent[];

}

export interface IChildComponent extends ISectionBase
{

}

/*
export interface IScenario extends ISectionBase
{

}

export interface IArchitecture extends ISectionBase
{
    components: IComponent[];
}

export interface IComponent {
    id: string;
    name: string;
}
*/
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

export type SectionCategoryType = 'categories' | 'scenarios' | 'architecture';