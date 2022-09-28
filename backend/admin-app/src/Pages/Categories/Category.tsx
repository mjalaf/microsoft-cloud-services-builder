import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { ISectionCategory } from "../../Shared/interfaces";

const Category =  (props) => {
    const [currentCategory, setCurrentCategory] = useState<ISectionCategory>();
    const [message, setMessage] = useState("");
    const params = useParams();
    
    const getCategory = id => {
        ApiService.get(id)
          .then(response => {
            setCurrentCategory(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

      useEffect(() => {
        getCategory(params.id);
      }, [params.id]);
    
      const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentCategory({ ...currentCategory, [name]: value });
      };
    
      const updatePublished = status => {
        var category = currentCategory !== undefined ? currentCategory : {};

        var data = {
          id: category.id,
          name: category.name,
          cssClass: category.cssClass,
          published: status
        };
    
        ApiService.update(category.id, data)
          .then(response => {
            setCurrentCategory({ ...currentCategory, published: status });
            console.log(response.data);
            setMessage("The status was updated successfully!");
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      const updateCategory = () => {
        var category = currentCategory !== undefined ? currentCategory : {};

        ApiService.update(category.id, currentCategory)
          .then(response => {
            console.log(response.data);
            setMessage("The Category was updated successfully!");
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      const deleteCategory = () => {
        var category = currentCategory !== undefined ? currentCategory : {};

        ApiService.remove(category.id)
          .then(response => {
            console.log(response.data);
            props.history.push("/Categorys");
          })
          .catch(e => {
            console.log(e);
          });
      };
      
 return (  <div>
    {currentCategory ? (
      <div className="edit-form">
        <h4>Category</h4>
        <form>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              value={currentCategory.id}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={currentCategory.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor=">cssClass">Css Class</label>
            <input
              type="text"
              className="form-control"
              id="cssClass"
              name="cssClass"
              value={currentCategory.cssClass}
              onChange={handleInputChange}
            />
          </div>


          <div className="form-group">
            <label>
              <strong>Status:</strong>
            </label>
            {currentCategory.published ? "Published" : "Pending"}
          </div>
        </form>

        {currentCategory.published ? (
          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(false)}
          >
            UnPublish
          </button>
        ) : (
          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(true)}
          >
            Publish
          </button>
        )}

        <button className="badge badge-danger mr-2" onClick={deleteCategory}>
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={updateCategory}
        >
          Update
        </button>
        <p>{message}</p>
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on a Category...</p>
      </div>
    )}
  </div>
);
};

export default Category;