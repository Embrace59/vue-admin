import router from "./index";
import store from "../store/index";

import { cookieGetToken, cookieRemoveToKen, cookieRemoveUserName } from "@/utils/app.js";

//白名单，数组类型，存放的是设置好的“白名单路由路径”
const whiteRouter = ["/login"];

//路由守卫
router.beforeEach((to, from, next) => {
    if (cookieGetToken()) {//cookie里的token存在
        //已经存在token，但是又手动路由到登陆界面，就把cookie和vuex里面的token和username清除了
        if (to.path === "/login") {
            cookieRemoveToKen();
            cookieRemoveUserName();
            store.commit("app/SET_TOKEN", '');
            store.commit("app/SET_USERNAME", '');
            next();
        }
        else {
            //获取用户角色
            //动态分配路由权限
            next();
        }
    }
    else {
        //indexof ,判断数组是否存在指定的对象，不存在，返回-1
        if (whiteRouter.indexOf(to.path) !== -1) {//跳转的路径在白名单中
            next();
        }
        else {
            //没有token，路由回登陆界面
            next('/login')  // 路由指向
        }
    }
})