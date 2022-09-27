import axios from "axios";
import { env } from "process";

export default  axios.create({
  baseURL: process.env.REACT_APP_APIS_URL,
  headers: {
    "Content-type": "application/json"
  }
});
