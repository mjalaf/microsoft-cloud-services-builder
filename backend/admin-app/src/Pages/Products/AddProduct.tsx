import React, { useState } from "react";
import ApiService from "../../services/ApiService";
import { useParams } from "react-router-dom";
import { IProduct,IDocument } from "../../Shared/interfaces";

const AddProduct = () => {
    const [product, setProduct] = useState<IProduct>();
    const [formDocumentValues, setDocumentFormValues] = useState<IDocument[]>([]);
    const params = useParams();

    const saveTutorial = () => {
        var data = {
          name: data.name,
          description: data.description
        };
    

        ApiService.postProduct(data)
          .then(response => {
            setProduct({
              name: response.data.name,
              description: response.data.description,
              cssClass: response.data.cssClass,
              image: response.data.image,
              parent:params.id
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
      const handleInputChange = event => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
      };

      let handleChange = (i, e) => {
        let newFormValues = [...formDocumentValues];

        newFormValues[i][e.target.name] = e.target.value;
        setDocumentFormValues(newFormValues);
      }

      let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formDocumentValues));
    }

      let addFormFields = () => {
        setDocumentFormValues([...formDocumentValues, { name: "", url: "" }])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formDocumentValues];
        newFormValues.splice(i, 1);
        setDocumentFormValues(newFormValues)
    }

 return (
        <div>    
            <h4>Add Azure Product</h4>
            <form className="form-group">
                <div className="col">
                    <label htmlFor="inputName" className="form-lebel">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={(product !== undefined ? product.name : "")}
                        onChange={handleInputChange}
                        name="name"
                        />                
                    </div>
                    <div className="col">
                    <label htmlFor="description" className="form-lebel" >Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        required
                        value={(product !== undefined ? product.description : "")}
                        onChange={handleInputChange}
                        name="description"
                        />
                </div>
                <div className="col">
                    <label htmlFor="inputImage" className="form-lebel">Image</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        required
                        value={(product !== undefined ? product.image : "")}
                        onChange={handleInputChange}
                        name="image"
                        />              
                </div>
                <div className="col">
                    <label htmlFor="inputcssClass" className="form-lebel">CSS Class</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cssClass"
                        required
                        value={(product !== undefined ? product.cssClass : "")}
                        onChange={handleInputChange}
                        name="cssClass"
                        />                     
                    </div>
                    <div className="col">
                    <h3>Add Documents</h3>
                    </div>

                        {formDocumentValues.map((element, index) => (
     
                            <div  key={index}>
                                <div className="row g-6">
                                    <div className="col">
                                        <label className="form-lebel" >Name</label>
                                        <input type="text"  className="form-control"  name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                                    </div>
                                    <div className="col">
                                        <label className="form-lebel" >Link</label>
                                        <input type="text"    className="form-control" name="url" value={element.url || ""} onChange={e => handleChange(index, e)} />
                                    </div>
                                    <div className="col">
                                    <label className="form-lebel">&nbsp; </label>

                                        {
                                            index ? 
                                            <button type="button"  className="form-control btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button> 
                                            : null
                                        }
                                    </div>
                                    
                                </div>
                                </div>
                        ))}
                <div className="button-section">
                    <button className="btn btn-primary" type="button" onClick={() => addFormFields()}>Add</button>
                </div>
            </form>
    </div>
    );
};


export default AddProduct;