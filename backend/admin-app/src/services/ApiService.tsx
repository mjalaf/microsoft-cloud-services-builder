import http from "../http-common";

const getAll = () => {
  return http.get(`products/${process.env.REACT_APP_AZURE_FUNCTION_CODE}`);
};

const get = (id) => {
  return http.get(`/products/${process.env.REACT_APP_AZURE_FUNCTION_CODE}&id=${id}`);
};

const create = (data) => {
  return http.post("/tutorials", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`);
};

const ApisService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default ApisService;
