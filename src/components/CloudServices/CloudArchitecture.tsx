import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { IServiceArchitecture, IServiceCategory } from 'shared/interfaces';
import CloudBlock from './CloudBlock';

export default  function CloudArchitecture(props: { serviceCategory: IServiceCategory, architecture: IServiceArchitecture  })   {
    const {serviceCategory, architecture} = props;

    function onDragStart(event: React.DragEvent, service: IServiceArchitecture) {
        const dragData = { 
            ...service, 
            category: serviceCategory.name,
            cssClass: serviceCategory.cssClass 
        };
        if (event.dataTransfer) {
            event.dataTransfer.setData('application/reactflow', JSON.stringify(dragData));
            event.dataTransfer.effectAllowed = 'move';
        }
    }

    const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: '#4b4b4b',
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#4b4b4b',
            fontSize: '12px',
        },
    }));

    return (
        <HtmlTooltip
            title={
                <>
                    <Typography color="inherit">{architecture.name}</Typography>
                    <div className="tooltip-description">{architecture.description}</div>
                    {architecture.relatedServices && (
                        <div className="tooltip-related-services">Related services: {architecture.relatedServices.join(', ')}</div>
                    )}
                </>
            }
        >
            <div key={architecture.name} 
                className={`${serviceCategory.cssClass} service-picker-item service-picker-item-size cursor-drag-drop`}
                onDragStart={(event) => onDragStart(event, architecture)} draggable
            >
                <CloudBlock name={architecture.name} 
                    description={architecture.description} 
                    image={architecture.image} 
                    cssClass={serviceCategory.cssClass}
                />
            </div>
        </HtmlTooltip>
    );
}