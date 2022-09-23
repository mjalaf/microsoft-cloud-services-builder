import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IComponent, ISectionCategory, SectionCategoryType } from 'shared/interfaces';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudService from './CloudService';
import CloudSectionCategory from './CloudSectionCategory'

export default function CloudServicePicker(props: { sectionType: SectionCategoryType}) {
    const {sectionType} = props;

    const [sectionCategories, setSectionCategories] = useState<ISectionCategory[]>([]);
    const [components, setComponents] = useState<IComponent[]>([]);
    const [sectionCategory, setSectionCategory] = useState<ISectionCategory | null>();

    useEffect(() => {
        const getData = async () => {
            if (sectionType === 'categories') {
                console.log("load categories");
                const svcCatsResponse = await axios.get('https://func-service-builder.azurewebsites.net/api/productcategory/?code=4FeWfIOqXlImp9OJisvbcQHBM92fRdVvlK3fiBt0oMFNAzFu6D8BvQ==');
            
                const svcCats: ISectionCategory[] = svcCatsResponse.data;
                setSectionCategories(svcCats);
            }

            if (sectionType === 'scenarios') {
                const svcsScenariosResponse = await axios.get('/data/serviceScenarios.json');
                const svcsScenarios: ISectionCategory[] = svcsScenariosResponse.data;
                setSectionCategories(svcsScenarios);
            }

            if (sectionType === 'architecture') {
                const svcsArchitectureResponse = await axios.get('/data/serviceArchitectures.json');
                const svcsAchitecture: ISectionCategory[] = svcsArchitectureResponse.data;
                setSectionCategories(svcsAchitecture);
            }

            const svcsResponse = await axios.get('https://func-service-builder.azurewebsites.net/api/products/?code=Y-BcpwJb4RhHCEj16PgVo2A9YQbb9S1Lh-jfo1t4WTWQAzFujgqchA==');
            const svcs: IComponent[] = svcsResponse.data;
            setComponents(svcs);
        };

        getData();
    }, []);


    function filterCategories(event: React.MouseEvent<HTMLDivElement, MouseEvent>, svcCat: ISectionCategory) {
        setSectionCategory(svcCat);
    }

    function getServicesSecenario(svcCat: ISectionCategory) {
        const scenario : IComponent[] = svcCat.components;
        let newComps : IComponent[] = new Array();
        
        for (const item of scenario) {

            const svcs = components.filter(svc => svc.id === item.id);
            newComps.push(...svcs);
        }
        svcCat.components =newComps;
        return svcCat;
    }
    function getArchitectureSecenario(svcCat: ISectionCategory) {
        const architecture : IComponent[] = svcCat.components;

        for (const current of architecture) {
    
            if (current.childs !== undefined && current.childs.length > 0)
                for (let index = 0; index < current.childs.length; index++) {
                    const currentItem = current.childs[index];
                    const svcs : IComponent | undefined = components.find(svc => svc.id === currentItem.id) ;
                    current.childs[index].cssClass = svcs?.cssClass;  
                    current.childs[index].description = svcs?.description;  
                    current.childs[index].image = svcs?.image;  
                    current.childs[index].documents = svcs?.documents;
                    current.childs[index].learnContent = svcs?.learnContent;
                    current.childs[index].azureCLICommand = svcs?.azureCLICommand;
                }
        }
     
        return svcCat;
    }
    
    function getServicesByCategoryType(svcCat: ISectionCategory) {

    //    const serviceNames = svcCat.serviceNames;
        if (sectionType === 'categories') {
            svcCat.components =  components.filter(svc => svc.parent === svcCat.id);
            return svcCat;
        }
        
        if (sectionType === 'scenarios') {
            return getServicesSecenario(svcCat);
        }

        if (sectionType === 'architecture') {
            return getArchitectureSecenario(svcCat);
        }
        
    }


    //eslint-disable-next-line
    function goBack(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
            setSectionCategory(null);
        }

    return (
        <>
            {sectionCategory && (
                <div onClick={(event) => goBack(event)} className="back-button-container">
                    <ArrowBackIcon className="back-button" />
                </div>
            )}
            <div className="service-picker">
                {!sectionCategory && sectionCategories.map(svcCat => (
                    <CloudSectionCategory key={svcCat.name}
                        sectionCategory={svcCat}
                        filterCategories={filterCategories} />
                ))}

                { sectionCategory && (getServicesByCategoryType(sectionCategory))?.components.map((comp: IComponent) => (
                    <CloudService key={comp.name}
                        sectionCategory={sectionCategory}
                        section={comp}
                    />
                ))
                } 

            </div>
        </>
    );
}