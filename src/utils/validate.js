//验证工具类：验证格式什么的。。。

/**
 * 过滤特殊字符
 */
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]");
    var rs = "";
    for (let i = 0; i < s.length; i++){
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 邮箱格式验证
 * 格式正确返回true
 * @param {*} value 
 */
export function emailRegTest(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(value) ? true : false;
}

/**
 * 验证密码格式
 * 密码为6-20位数字+字母
 * 格式正确返回true
 * @param {*} value 
 */
export function passwordRegTest(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return reg.test(value) ? true : false;
}

/**
 * 验证码格式验证
 * 6位数字
 * 格式正确返回true
 * @param {*} value 
 */
export function codeRegTest(value){
    let reg = /^[a-z0-9]{6}$/;
    return reg.test(value) ? true : false;
}