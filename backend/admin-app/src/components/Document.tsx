import React, { useState } from "react";
import { IDocument } from "../Shared/interfaces";
const [formDocumentValues, setDocumentFormValues] = useState<IDocument[]>([]);

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


export default props => (
    formDocumentValues.map((element, index) => (
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
    )));