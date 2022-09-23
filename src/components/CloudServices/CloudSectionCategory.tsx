import React from 'react';
import { ISectionCategory } from 'shared/interfaces';
import CloudBlock from './CloudBlock';

export default function CloudServiceCategory(props: { sectionCategory: ISectionCategory, 
  filterCategories: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, svcCat: ISectionCategory) => void }) {
    const { sectionCategory, filterCategories } = props;
    
    return (
        <div key={sectionCategory.name} 
            className={`${sectionCategory.cssClass !== undefined ? sectionCategory.cssClass   : "bg-gn"  } service-picker-item service-picker-item-size cursor-pointer`}
            onClick={(event) => filterCategories(event, sectionCategory)}
        >
            <CloudBlock name={sectionCategory.name} />                
        </div>
    );
}