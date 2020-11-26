//导入/utils/request.js里面创建的ajax实例service
import service from "@/utils/request.js"

/**
 * 获取验证码
 * export一个post请求
 * @param {*} data 
 */
export function GetSms(data) {
    return service.request({
        method: "post",
        url: "/getSms/",
        data: data
    })
}

/**
 * 注册
 */
export function Register(data) {
    return service.request({
        method: "post",
        url: "/register",
        data: data
    })
}

/**
 * 登录
 */
export function Login(data) {
    return service.request({
        method: "post",
        url: "/login/",
        data: data
    })
}