export interface ICategoryBase {
  id?: string;
  name?: string;
  partitionKey?: string;
  cssClass?: string;
  description?: string;
  
}

export interface IResourceBase{
  id?: string;
  name?: string;
  description?: string;
  link?:string;
  parent?:string;
  image?: string;
  cssClass?: string;
  documents?: IDocument[];
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
    azureCLICommand?: string[];
    learnContents?: ILearnContent[];
}

interface IResourceId
{
    id:string;
}

export interface IDocument {
    name?: string;
    url?: string;
}

export interface ILearnContent extends IDocument {
    type?: LearnType;
    image?: string;
    modules: IDocument[]
}
/*

export interface ISectionBase {
    id?: string;
    name?: string;
    description?: string;
    cssClass?: string;
    image?: string;
    parent?: string;
    azureCLICommand?: string[];
    documents?: IDocument[];
    learnContent?: ILearnContent[];
  //  published?: boolean;
}

export interface IComponent extends ISectionBase
{
    childs : IChildComponent[];

}

export interface ICategory
{
    id?: string;
    name?: string;
    cssClass?: string;
    description?: string;
}
export interface ISectionCategory extends ICategory {
 //   svcCat: () => Promise<ISectionBase[]>;
    components?: IComponent[];
    published?: string;
 }

export interface IChildComponent extends ISectionBase
{

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
  */
  export type LearnType = 'path' | 'module';
