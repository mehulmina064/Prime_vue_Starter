/* eslint-disable prettier/prettier */
import axios from "axios";
const service = axios.create({
  // eslint-disable-next-line no-undef
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL:'http://localhost:3000',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
});
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // if (useUsersStore().token) {
      // // console.log('token')
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers["Authorization"] = "Bearer " + getToken();
      // config.headers['secure'] = true
      // config.headers['mode'] = 'cors'
    // }
    return config;
  },
  (error) => {
    // do something with request error
    // console.log(error) // for debug
  
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
        
    console.log('response-service',response); //
    return response.data; 
  },
  (error) => {
    console.log('response-err'); //
    return Promise.reject(error);
  }
);

export default service;
