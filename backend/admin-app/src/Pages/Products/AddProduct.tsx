import React, { useState } from "react";
import ApiService from "../../services/ApiService";
import { useParams } from "react-router-dom";
import { IProduct,IDocument, ILearnContent } from "../../Shared/interfaces";
import { useNavigate  } from "react-router-dom";
import { url } from "inspector";

const AddProduct = () => {
    const [product, setProduct] = useState<IProduct>();
    const [formDocumentValues, setDocumentFormValues] = useState<IDocument[]>([]);
    const [formLearns, setLearnForms] = useState<ILearnContent[]>([]);
    
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const params = useParams();

    const validateRequiredFileds  = ()=> {
      let prod : IProduct = {};
      prod = ( product !== undefined ? product : prod); 

      if (prod.name === undefined	 || prod.name === "")
        return false;
      if (prod.description === undefined || prod.description === "")
        return false;
      if (prod.link === undefined || prod.link === "")
        return false;

      return true;

    };

    const saveProduct = () => {
      if (validateRequiredFileds()){

        try {
          let prod : IProduct = {};
          prod = ( product !== undefined ? product : prod); 
    
          let lerns : ILearnContent[] = [];

          
          if (formLearns !== undefined ){
            lerns = formLearns;
          }

          prod.parent= params.id;
          prod.documents = formDocumentValues;
          prod.learnContents = lerns;

          ApiService.postProduct(prod);
        //  setMessage(JSON.stringify(prod));
    
          setMessage("Product added Successfully");
      
          setTimeout(() => {  navigate("../Categories/" + params.id); }, 2000);
          

      } catch (error) {

          setMessage("An error has ocurred");
          console.log(`Error Detail: ${error}` );
       
        }
    }
    else
    {
      setMessage("Name, Description and Link are required fields");
    }
  }
     
      const handleInputChange = event => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
      };

      let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formDocumentValues));
     }

      // Documents heanders
      let handleDocumentChange = (i, e) => {
        let newFormValues = [...formDocumentValues];
        newFormValues[i][e.target.name] = e.target.value;
        setDocumentFormValues(newFormValues);
      }

      let addDocumentFormFields = () => {
        setDocumentFormValues([...formDocumentValues, { name: "", url: "" }])
      }

      let removeDocumentFormFields = (i) => {
        let newFormValues = [...formDocumentValues];
        newFormValues.splice(i, 1);
        setDocumentFormValues(newFormValues)
    }

      // Learning heanders
      const handleLearningInputChange = (i, e) => {
        let newFormValues = [...formLearns];
        newFormValues[i][e.target.name] = e.target.value;
        setLearnForms(newFormValues);

      };

      let handleLearnDocumentChange = (learnIndex, i, e) => {
      let newFormValues = [...formLearns];
      newFormValues[learnIndex].modules[i][e.target.name] =  e.target.value;
    
        setLearnForms(newFormValues);
      }

      let addFormLearnDocumentFields = (learnIndex) => {
        let newFormValues = [...formLearns];

        let {modules = []  } =  formLearns[learnIndex]
        modules.push({ name: "", url: "" })

        setLearnForms(newFormValues)
      }

     let addFormLearnForm = () => {
      setLearnForms([...formLearns, { name: "", url: "", image: "",    modules: [] }])
     }

      let removeFormLearnDocumentFields = (learnIndex,i) => {

        let newFormValues = [...formLearns];
        newFormValues[learnIndex].modules.splice(i, 1);
        setLearnForms(newFormValues)
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
                    <label htmlFor="description" className="form-lebel" >Link</label>
                    <input
                        type="text"
                        className="form-control"
                        id="link"
                        value={(product !== undefined ? product.link : "")}
                        onChange={handleInputChange}
                        name="link"
                        />
                </div>
                <div className="col">
                    <label htmlFor="inputImage" className="form-lebel">Image</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
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
                                        <input type="text" required  className="form-control"  name="name" value={element.name || ""} onChange={e => handleDocumentChange(index, e)} />
                                    </div>
                                    <div className="col">
                                        <label className="form-lebel" >Link</label>
                                        <input type="text" required   className="form-control" name="url" value={element.url || ""} onChange={e => handleDocumentChange(index, e)} />
                                    </div>
                                    <div className="col">
                                    <label className="form-lebel">&nbsp; </label>
                                        {
                                            index ? 
                                            <button type="button"  className="form-control btn btn-danger" onClick={() => removeDocumentFormFields(index)}>Remove</button> 
                                            : null
                                        }
                                    </div>
                                        
                                </div>
                                </div>
                        ))}
                <div className="col-md-3">
                    <div>&nbsp;</div>
                    <button className="btn btn-primary" type="button" onClick={() => addDocumentFormFields()}>Add</button>
                </div>

                <div className="col">
                    <h3>Add Learning Reference</h3>
                </div>
                {formLearns.map((learnElement, i) => (
                    <div key={i}>
                      <div className="col">
                      <label htmlFor="inputcssClass" className="form-lebel">Learning Name</label>
                          <input
                              type="text"
                              className="form-control"
                              id="learnName"
                              value={(learnElement !== undefined ? learnElement.name : "")}
                              onChange={e => handleLearningInputChange(i, e)} 
                              name="name"
                              />                     
                        </div>
                        <div className="col">
                          <label htmlFor="inputcssClass" className="form-lebel">Learning Image</label>
                          <input
                              type="text"
                              className="form-control"
                              id="learnImage"
                              value={(learnElement !== undefined ? learnElement.image : "")}
                              onChange={e => handleLearningInputChange(i, e)} 
                              name="image"
                              />                     
                        </div>
                        <div className="col">
                          <label htmlFor="inputcssClass" className="form-lebel">Learn Link</label>
                          <input
                              type="text"
                              className="form-control"
                              id="learnURL"
                              value={(learnElement !== undefined ? learnElement.url : "")}
                              onChange={e => handleLearningInputChange(i, e)} 
                              name="url"
                              />                     
                        </div>
                        <div className="col">
                          <fieldset className="row mb-3">
                            <legend className="col-form-label col-sm-2 pt-0">Learning Type</legend>
                              <div className="col-sm-10">
                                  <div className="form-check">
                                    <input className="form-check-input" 
                                                type="radio" 
                                                name="type"
                                                value="path" 
                                                onChange={e => handleLearningInputChange(i, e)}   
                                                checked={(learnElement !== undefined && learnElement.type ==="path" ? true  : false )}  />
                                    <label className="form-check-label" htmlFor="path">
                                      Path
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input className="form-check-input"
                                                type="radio" 
                                                name="type" 
                                                value="module" 
                                                checked={(learnElement !== undefined && learnElement.type ==="module" ? true  : false )} 
                                                onChange={e => handleLearningInputChange(i, e)}  />
                                    <label className="form-check-label" htmlFor="module">
                                      Module
                                    </label>
                                  </div>
                                </div>
                           </fieldset>
                        </div>
                        <div className="col">
                          <h4>Add Courses</h4>
                        </div>
                        {formLearns[i].modules.map((element, index) => (
                            <div  key={ index}>
                                <div className="row g-6">
                                    <div className="col">
                                        <label className="form-lebel" >Name</label>
                                        <input type="text" required  className="form-control"  name="name"  value={element.name || ""} onChange={e => handleLearnDocumentChange(i, index, e)} />
                                    </div>
                                    <div className="col">
                                        <label className="form-lebel" >Link</label>
                                        <input type="text" required  className="form-control"  name="url" value={element.url || ""} onChange={e => handleLearnDocumentChange(i, index, e)} />
                                        
                                    </div>
                                    <div className="col">
                                    <label className="form-lebel">&nbsp; </label>
                                        {
                                           index ? 
                                            <button type="button"  className="form-control btn btn-danger" onClick={() => removeFormLearnDocumentFields(i, index)}>Remove</button> 
                                            : null
                                        }
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                        <div className="col-md-3">
                        <div>&nbsp;</div>
                        <button className="btn btn-primary" type="button" onClick={() => addFormLearnDocumentFields(i)}>Add Course Document</button>
                        </div>
                    </div>
              ))}
              <div className="col-md-3">
                 <div>&nbsp;</div>
                   <button className="btn btn-primary" type="button" onClick={() => addFormLearnForm()}>Add Learning</button>
              </div>
                    
            </form>
            <div className="row">
              <div className="col-md-3">
              <label className="form-lebel">&nbsp; </label>                            
              <button onClick={saveProduct} className="form-control btn btn-primary">
                Submit
              </button>
              </div>
              <p>{message}</p>
          </div>
    </div>
    );
};


export default AddProduct;