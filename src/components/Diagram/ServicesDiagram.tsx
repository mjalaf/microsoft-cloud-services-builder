import React, { useEffect, useRef, useState } from 'react';

import ReactFlow, {
    removeElements,
    addEdge,
    // Background,
    EdgeTypesType,
    Elements,
    Connection,
    Edge,
    Node,
    ArrowHeadType,
    FlowElement,
    Position,
    isEdge,
    getConnectedEdges,
    XYPosition
} from 'react-flow-renderer';

import FloatingEdge from './FloatingEdge';
import FloatingConnectionLine from './FloatingConnectionLine';
import { createElements } from './diagramUtils';
import { IComponent, ISectionBase } from 'shared/interfaces';
import CloudBlock from 'components/CloudServices/CloudBlock';
import { servicesAtom } from 'atoms/servicesAtom';
import { useSetRecoilState } from 'recoil';


const initialElements: Elements = createElements();

const edgeTypes: EdgeTypesType = {
    floating: FloatingEdge,
};

export default function ServicesDiagram(){
    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const [elements, setElements] = useState<Elements>(initialElements);
    // useRef needed since using useState() creates stale closure issue due to keydown binding
    const services = useRef<ISectionBase[]>([]);
    const selectedElement = useRef<Node | Edge>();
    const setServices = useSetRecoilState(servicesAtom);

    function deleteSelectedElement(key: string) { 
        const currentSelectedElement = selectedElement.current;
        if (key === 'Delete' && currentSelectedElement) {
            //eslint-disable-next-line
            removeService(currentSelectedElement);
        }
    }

    function removeService(currentSelectedElement: Node<any> | Edge<any>) {
        const edges = elements.filter((element: Node | Edge) => isEdge(currentSelectedElement)) as Edge[];
        const edgesToRemove = getConnectedEdges([currentSelectedElement as Node], edges);
        onElementsRemove([currentSelectedElement, ...edgesToRemove]);
        removeServices([currentSelectedElement as Node]);
    }

    function removeServices(removedSvcs: Node[]) {
        const removedSvcNames = removedSvcs.map(svc => svc.id);
        services.current = services.current.filter(svc => !removedSvcNames.includes(svc.name));
        setServices(services.current);
    }

    function onKeyDown(event: KeyboardEvent) {
        deleteSelectedElement(event.key);
    } 

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        // Clean up
        return () => document.addEventListener('keydown', onKeyDown);
  }, []); // eslint-disable-line

    function onLoad(_reactFlowInstance: any) {
        setReactFlowInstance(_reactFlowInstance);
        _reactFlowInstance.fitView();
     
    }

    const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));

    function onConnect(params: Connection | Edge) {
        setElements((els) => addEdge({ ...params, type: 'floating', arrowHeadType: ArrowHeadType.Arrow }, els));
    }

    function onDragOver(event: React.DragEvent) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }
   
    function drawDefinedDiagrams(component: IComponent)
    {
        
        let i =0;
        let currentPosition : XYPosition = { x: 5, y: 5};
        for (const comp of component.childs)
        {
            i++;
           // Make sure they haven't already added the service
        if (services.current.findIndex(svc => svc.name === comp.name) > -1) {
            return;
        }

        services.current = services.current.concat(comp);
        setServices(services.current);

        const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect() as DOMRect;

        calculatePosition(i,currentPosition);

        const newNode: FlowElement = {
            id: comp.name,
            position:   { x: currentPosition.x, y: currentPosition.y } ,
            className: comp.cssClass,
            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            data: { 
                label: <CloudBlock name={comp.name} 
                    description={comp.description} 
                    image={comp.image} 
                    showDeleteButton={true} 
                    deleteService={deleteSelectedElement} /> 
            }
        };
    
        setElements((es) => es.concat(newNode));
     }
    }

    
    function calculatePosition(i: number, position : XYPosition) : XYPosition
    {
        if (i === 1)
           return position;
     
         position.x = position.x + 200; 
     
         if (i % 3 === 0  )
         {  
            position.x = 5; 
            position.y = position.y + 25 * 3; 
         }
        return position;
            
    }

    function onDrop(event: React.DragEvent){
        const data = event.dataTransfer.getData('application/reactflow');

        if (data) {
            const service: IComponent = JSON.parse(data);

            if (service.childs == undefined || service.childs.length == 0){
            // Make sure they haven't already added the service
            if (services.current.findIndex(svc => svc.name === service.name) > -1) {
                return;
            }

            // Track newly dropped service (drives docs/learn/cli display)
            services.current = services.current.concat(service);
            setServices(services.current);

            const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect() as DOMRect;
            const position = reactFlowInstance?.project({
                x: (event.clientX - reactFlowBounds.left) - 120,
                y: (event.clientY - reactFlowBounds.top) - 40,
            });

            const newNode: FlowElement = {
                id: service.name,
                position,
                className: service.cssClass,
                sourcePosition: Position.Left,
                targetPosition: Position.Right,
                data: { 
                    label: <CloudBlock name={service.name} 
                        description={service.description} 
                        image={service.image} 
                        showDeleteButton={true} 
                        deleteService={deleteSelectedElement} /> 
                }
            };
      
            setElements((es) => es.concat(newNode));
            event.preventDefault();
            }
            else
            drawDefinedDiagrams(service);
        }
    }

    function onElementClick(event: React.MouseEvent, element: Node | Edge) {
        selectedElement.current = element;
    }

    return (
        <>
            <div className="heading">Selected Cloud Services</div>
            <div className="container floatingedges" ref={reactFlowWrapper}>
                <ReactFlow
                    elements={elements}
                    snapToGrid
                    onElementClick={onElementClick}
                    onConnect={onConnect}
                    onLoad={onLoad}
                    edgeTypes={edgeTypes}
                    connectionLineComponent={FloatingConnectionLine}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    defaultZoom={1.3}
                    zoomOnScroll={false}
                >
                    {/* <Background size={0.5} /> */}
                    
                </ReactFlow>
            </div>
        </>
    );
}