import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IService, IServiceCategory, IServiceScenario, ServiceCategoryType, IServiceArchitecture } from 'shared/interfaces';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudService from './CloudService';
import CloudServiceCategory from './CloudServiceCategory';
import CloudArchitecture from './CloudArchitecture';

export default function CloudServicePicker(props: { categoryType: ServiceCategoryType}) {
    const {categoryType} = props;

    const [serviceCategories, setServiceCategories] = useState<IServiceCategory[]>([]);
    const [services, setServices] = useState<IService[]>([]);
    const [serviceCategory, setServiceCategory] = useState<IServiceCategory | null>();


    useEffect(() => {
        const getData = async () => {
            if (categoryType === 'categories') {
                console.log("load categories");
                const svcCatsResponse = await axios.get('https://func-service-builder.azurewebsites.net/api/productcategory/?code=4FeWfIOqXlImp9OJisvbcQHBM92fRdVvlK3fiBt0oMFNAzFu6D8BvQ==');
            
                const svcCats: IServiceCategory[] = svcCatsResponse.data;
                setServiceCategories(svcCats);
            }

            if (categoryType === 'scenarios') {
                const svcsScenariosResponse = await axios.get('/data/serviceScenarios.json');
                const svcsScenarios: IServiceCategory[] = svcsScenariosResponse.data;
                setServiceCategories(svcsScenarios);
            }

            if (categoryType === 'architecture') {
                const svcsArchitectureResponse = await axios.get('/data/serviceArchitectures.json');
                const svcsAchitecture: IServiceCategory[] = svcsArchitectureResponse.data;
                setServiceCategories(svcsAchitecture);
            }


            const svcsResponse = await axios.get('https://func-service-builder.azurewebsites.net/api/products/?code=Y-BcpwJb4RhHCEj16PgVo2A9YQbb9S1Lh-jfo1t4WTWQAzFujgqchA==');
            const svcs: IService[] = svcsResponse.data;
            setServices(svcs);
        };

        getData();
    }, []);


    function filterCategories(event: React.MouseEvent<HTMLDivElement, MouseEvent>, svcCat: IServiceCategory) {
        setServiceCategory(svcCat);
    }

    function getServicesSecenario(svcCat: IServiceCategory) {
        const scenario : IServiceScenario[] = svcCat.scenenarios;

        svcCat.services = [];
        for (const item of scenario) {
            const svcs = services.filter(svc => svc.id === item.id);
            svcCat.services.push(...svcs);
        }
        return svcCat;
    }
       /* 
    function getArchitectureSecenario(svcCat: IServiceCategory) {
        const architecture : IServiceArchitecture[] = svcCat.architectures;

        svcCat.services = [];
        for (const item of architecture) {
    //        const svcs = services.filter(svc => svc.id === item.id);
           // svcCat.services.push(item);
        }
        return svcCat;
    }*/
       

    function getServicesByCategoryType(svcCat: IServiceCategory) {

    //    const serviceNames = svcCat.serviceNames;
        if (categoryType === 'categories') {
            svcCat.services =  services.filter(svc => svc.parent === svcCat.id);
            return svcCat;
        }
        
        if (categoryType === 'scenarios') {
            return getServicesSecenario(svcCat);
        }
/*
        if (categoryType === 'architecture') {
            return getArchitectureSecenario(svcCat);
        }
        */
    }


    //eslint-disable-next-line
    function goBack(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
            setServiceCategory(null);
        }

    return (
        <>
            {serviceCategory && (
                <div onClick={(event) => goBack(event)} className="back-button-container">
                    <ArrowBackIcon className="back-button" />
                </div>
            )}
            <div className="service-picker">
                {!serviceCategory && serviceCategories.map(svcCat => (
                    <CloudServiceCategory key={svcCat.name}
                        serviceCategory={svcCat}
                        filterCategories={filterCategories} />
                ))}

                { categoryType !== 'architecture' && serviceCategory && (getServicesByCategoryType(serviceCategory))?.services.map((service: IService) => (
                    <CloudService key={service.name}
                        serviceCategory={serviceCategory}
                        service={service}
                    />
                ))
                 
                } 
                 
                { categoryType === 'architecture' && serviceCategory && serviceCategory.architectures.map((arch: IServiceArchitecture) => (
                    <CloudArchitecture key={arch.name}
                        serviceCategory={serviceCategory}
                        architecture={arch}
                    />
                ))}

            </div>
        </>
    );
}