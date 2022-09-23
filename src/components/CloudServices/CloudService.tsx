import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { ISectionBase, ISectionCategory } from 'shared/interfaces';
import CloudBlock from './CloudBlock';
import { JsxElement } from 'typescript';

export default  function CloudService(props: { sectionCategory: ISectionCategory, section: ISectionBase  })   {
    const {sectionCategory, section} = props;

    function onDragStart(event: React.DragEvent, service: ISectionBase) {
        const dragData = { 
            ...service, 
            category: sectionCategory.name,
            cssClass: sectionCategory.cssClass 
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
                    <Typography color="inherit">{section.name}</Typography>
                    <div className="tooltip-description">{section.description}</div>
                    
                </>
            }
        >
            <div key={section.name} 
                className={`${sectionCategory.cssClass !== undefined ? sectionCategory.cssClass : "bg-gn"} service-picker-item service-picker-item-size cursor-drag-drop`}
                onDragStart={(event) => onDragStart(event, section)} draggable
            >
                <CloudBlock name={section.name} 
                    description={section.description} 
                    image={section.image} 
                    cssClass={section.cssClass}
                />
            </div>
        </HtmlTooltip>
    );
}