import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.43.85:9013'
// axios.defaults.timeout = '5000'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';        //配置请求头 
// axios.defaults.withCredentials = true;// 允许跨域携带cookie

//http request 拦截器
axios.interceptors.request.use(
    config => {
        // config.data = JSON.stringify(config.data)
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = token
        }
        // console.log(config)
        return config
    },
    error => {
        return Promise.reject(err)
    }
)

//http response 拦截器
axios.interceptors.response.use(
    response => {
        if(!response.res){
            return Promise.resolve(response)
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,JSON.stringify(data))
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}
export default axios