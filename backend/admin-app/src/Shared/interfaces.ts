export interface ICategory
{
    id?: string;
    name?: string;
    cssClass?: string;
    }
export interface ISectionCategory extends ICategory {
 //   svcCat: () => Promise<ISectionBase[]>;
    components?: IComponent[];
    published?: string;
 }

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
    published?: boolean;
}

export interface IComponent extends ISectionBase
{
    childs : IChildComponent[];

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
  export type LearnType = 'path' | 'module';
