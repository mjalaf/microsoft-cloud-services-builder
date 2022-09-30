import { categoryRepository } from "../repositories/categoryRepository";
import { IProductCategory } from "../shared/interfaces";
import { util } from "../shared/util";

const section= 'ProductScenario';

export function getScenarioCategories() : Promise<IProductCategory[]>
{
    return categoryRepository.getProductsFromSectionfromCosmosDb(section)
}

export function getScenarioCategoryById(id : string) : Promise<IProductCategory>
{
    return categoryRepository.getCategoryByIdfromCosmosDb(id, section);
}

export function upsertScenarioCategory(productCategory : IProductCategory) : Promise<string>
{
    productCategory.partitionKey=section;
    if (productCategory.id === undefined)
    {
        const index =  util.getIndex();
        productCategory.id = "SRVCAT-" + index;

    }
    return categoryRepository.upsertCategoryCosmosDb(productCategory);
}
