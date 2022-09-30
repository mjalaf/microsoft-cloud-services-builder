import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { IProductCategory } from "../../Shared/interfaces";
import { useNavigate  } from "react-router-dom";

const Category =  (props) => {
    const [currentCategory, setCurrentCategory] = useState<IProductCategory>();
    const [message, setMessage] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    const getCategory = id => {
        ApiService.getProductCategoryById(id)
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
    /*
      const updatePublished = status => {
        var category = currentCategory !== undefined ? currentCategory : {};

        var data = {
          id: category.id,
          name: category.name,
          cssClass: category.cssClass,
          published: status
        };
    
        ApiService.postProductCategory(data)
          .then(response => {
            setCurrentCategory({ ...currentCategory, published: status });
            console.log(response.data);
            setMessage("The status was updated successfully!");
          })
          .catch(e => {
            console.log(e);
          });
      };
    */
      const updateCategory = () => {
        var category = currentCategory !== undefined ? currentCategory : {};

        ApiService.postProductCategory(currentCategory)
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
/*
        ApiService.remove(category.id)
          .then(response => {
            console.log(response.data);
            props.history.push("/Categorys");
          })
          .catch(e => {
            console.log(e);
          });
  */
        };
        const addProduct = () => {
          var category = currentCategory !== undefined ? currentCategory : {};

          const id = category.id;
          navigate("../addproduct/" + id);
         // props.history.push();
        };

 return (  
 <div>
    {currentCategory ? (
      <div>
        <h4>Category</h4>
        <form className="row g-3">
          <div className="form-group">
            <label htmlFor="id" className="form-label">ID</label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              value={currentCategory.id}
              onChange={handleInputChange}
            />
           <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={currentCategory.name}
              onChange={handleInputChange}
            />
          </div>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={currentCategory.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor=">cssClass" className="form-label">Css Class</label>
            <input
              type="text"
              className="form-control"
              id="cssClass"
              name="cssClass"
              value={currentCategory.cssClass}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-danger me-md-2" onClick={deleteCategory}>
              Delete
            </button>
            <button type="submit" className="btn btn-primary me-md-2" onClick={updateCategory}>
              Update
            </button>
            <button type="submit" className="btn btn-primary me-md-2" onClick={addProduct} >
              Add Product
            </button>
            <p>{message}</p>
         </div>
        </form>
      </div>
    ) : (
      <div className="col-12">
        <br />
        <p>Please click on a Category...</p>
      </div>
    )}
  </div>
);
};

export default Category;