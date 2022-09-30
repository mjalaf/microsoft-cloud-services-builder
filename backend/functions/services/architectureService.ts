import { categoryRepository } from "../repositories/categoryRepository";
import { resourceRepository } from "../repositories/resourceRepository";
import { IArchitecture, IProductCategory } from "../shared/interfaces";
import { util } from "../shared/util";

const section= 'ProductArchitecture';

export function getArchitectureCategories() : Promise<IProductCategory[]>
{
    return categoryRepository.getProductsFromSectionfromCosmosDb(section)
}

export function getArchitectureCategoryById(id : string) : Promise<IProductCategory>
{
    return categoryRepository.getCategoryByIdfromCosmosDb(id, section);
}

export function upsertArchitectureCategory(productCategory : IProductCategory) : Promise<string>
{
    productCategory.partitionKey=section;
    if (productCategory.id === undefined)
    {
        const index = util.getIndex();
        productCategory.id = "ARCHCAT-" + index;

    }
    return categoryRepository.upsertCategoryCosmosDb(productCategory);
}

export function upsertArchitecture(architecture : IArchitecture) : Promise<string>
{
    return resourceRepository.upsertArchitectureCosmosDb(architecture);
}


/*
async function getIndex() {
    let resources = await categoryRepository.getIndex(section);
    let index : number = 0;
    try {
      index = resources[0];
      index =  index + 1;

    } catch (error) {
      index = 1
    }

    return index;
}*/