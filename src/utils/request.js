import axios from "axios";
import { Message } from 'element-ui'
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
        let responseData = response.data;////response.data是后台返回的
        if (responseData.resCode !== 0) {//返回的data.rescode不是0，就error了
            Message.error(response.message);
            return Promise.reject(responseData);
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