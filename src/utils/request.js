import axios from "axios";
import {Message} from 'element-ui'
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

const service = axios.create({
    baseURL: BASEURL,
    timeout: 15000,
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
    function (response) {
        let data = response.data;
        if (data.resCode !== 0) {
            Message.error(response.message);
            return Promise.reject(data);
        }
        else {
            return response;
            // return to Promise.resolve(data);
        }
        
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default service;