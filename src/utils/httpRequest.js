import Vue from "vue";
import http from "axios";
import Qs from "qs";

http.defaults.timeout = 10000;
// http.defaults.withCredentials = true;
http.defaults.baseURL = "http://127.0.0.1:8089";

http.interceptors.request.use((config) => {
    if(config.method == 'get'){
        config.params = config.data
    }
    if(config.formUrlencoded){
        if(config.method == 'post'){
            config.data = Qs.stringify(config.data)
        }
    }else{
        if(config.method == 'post'){
            config.data = Qs.stringify(config.data)
        }
    }
    return config
})

http.interceptors.response.use((response) => {
    return Promise.resolve(response);
})

const httpRequest = (methods,url,data) =>{
    return new Promise((resolve,reject) =>{
        http.request({
            method:methods,
            url:url,
            data:data
        })
        .then(res =>{
            resolve(res)
        })
        .catch(err =>{
            reject(err)
        })
    })
}
export default httpRequest;
