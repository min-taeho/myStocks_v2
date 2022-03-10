import axios from "axios";
import { API_URL } from "./config";
import responseInterceptors from "./http.interceptors.response";


console.log('API_URL', API_URL)

const http = axios.create({
  baseURL: API_URL
});


http.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);


http.interceptors.response.use(
    function(response) {
        //console.log('interceptors.response', response);
        return response;
    }, responseInterceptors(http) );

export default http;
