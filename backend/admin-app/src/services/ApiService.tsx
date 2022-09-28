import http from "../http-common";

const getProductCategories = () => {
  return http.get(`productcategory/${process.env.REACT_APP_AZURE_FUNCTION_CODE}`);
};

const getProductCategoryById = (id) => {
  return http.get(`productcategory/${id}/${process.env.REACT_APP_AZURE_FUNCTION_CODE}`);
};

const getAllProducts = () => {
  return http.get(`productcategory/${process.env.REACT_APP_AZURE_FUNCTION_CODE}`);
};

const getProductsByCategoryId = () => {
  return http.get(`productcategory/${process.env.REACT_APP_AZURE_FUNCTION_CODE}`);
};

const getProductById = () => {
  return http.get(`productcategory/${process.env.REACT_APP_AZURE_FUNCTION_CODE}`);
};

const get = (id) => {
  return http.get(`/products/${process.env.REACT_APP_AZURE_FUNCTION_CODE}&id=${id}`);
};

const postProductCategory = (data) => {
  return http.post("/tutorials", data);
};

const postProduct = (data) => {
  return http.post("/tutorials", data);
};


const ApisService = {
  getProductCategories,
  getProductCategoryById,
  getAllProducts,
  getProductsByCategoryId,
  getProductById,
  postProductCategory,
  postProduct
};

export default ApisService;
