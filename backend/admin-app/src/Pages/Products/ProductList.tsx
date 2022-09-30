import React, { useState } from "react";
import TutorialDataService from "../../services/ApiService";
import { IProduct } from "../../Shared/interfaces";


const ProductList  = (props) => {
    const [products, setproducts] = useState<IProduct[]>([]);;

 return (<div>    
     Product List
 </div>
 );
};


export default ProductList;