import Vue from "vue";
import SvgIcon from "./SvgIcon";
// register globally
Vue.component("svg-icon", SvgIcon);

/**
 * require.context:读取指定目录的所有文件
 * 第一个，'./svg'，就是指定要读取的目录
 * 第二个， false，是否遍历子集目录，true就遍历一次
 * 第三个，是一个正则，定义了遍历文件的规则，这里的规则是：获取当前svg目录所有为.svg结尾的文件
 */
const req = require.context('./svg', false, /\.svg$/); 
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext);  // 解析获取的.svg文件的文件名称，并返回
};
requireAll(req);