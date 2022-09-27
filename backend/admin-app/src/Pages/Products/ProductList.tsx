import React, { useState } from "react";
import TutorialDataService from "../../services/ApiService";
import { IComponent, ISectionBase } from "../../Shared/interfaces";


const ProductList  = (props) => {
    const [products, setproducts] = useState<IComponent[]>([]);;

 return (<div>    
     Product List
 </div>
 );
};


export default ProductList;