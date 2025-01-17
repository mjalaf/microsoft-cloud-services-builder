import { categoryRepository } from "../repositories/categoryRepository";
import { IProductCategory } from "../shared/interfaces";
import { util } from "../shared/util";

const section= 'ProductCategory';

export function getProductCategories() : Promise<IProductCategory[]>
{
    return categoryRepository.getProductsFromSectionfromCosmosDb(section)
}

export function getProductCategoryById(id : string) : Promise<IProductCategory>
{
    return categoryRepository.getCategoryByIdfromCosmosDb(id, section);
}

export function upsertProductCategory(productCategory : IProductCategory) : Promise<string>
{
    productCategory.partitionKey=section;
    if (productCategory.id === undefined)
    {
        const index = util.getIndex();
        productCategory.id = "ARCHCAT-" + index;

    }
    return categoryRepository.upsertCategoryCosmosDb(productCategory);
}
