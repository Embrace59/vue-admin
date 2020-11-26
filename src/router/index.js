import Vue from "vue";
import VueRouter from "vue-router";//引入插件
import Login from "../views/Login/index.vue";

Vue.use(VueRouter);//Vue.use()全局使用插件

export default new VueRouter({
    routes: [
        //登录页
        {
            path: "/",
            redirect: "login",
            hidden:true,
            meta: {
                name: "主页"
            }
        },
        {
            path: "/login",
            name: "Login",
            hidden:true,
            meta: {
                name: "登录"
            },
            component : () => import("../views/Login/index.vue")
        },
        //后台页
        {
            path: "/console",
            name: "Console",
            redirect: "index",
            meta: {
                name: "控制台",
                icon: "menu"
            },
            component: () => import("../views/Layout/index.vue"),
            children: [
                {
                    path: "/index",
                    name: "index",
                    meta: {
                        name: "首页"
                    },
                    component: () => import("../views/Console/index.vue"),
                }
            ]
        },
        {
            path: "/console",
            name: "Console",
            redirect: "index",
            meta: {
                name: "信息管理"
            },
            component: () => import("../views/Layout/index.vue"),
            children: [
                {
                    path: "/infoIndex",
                    name: "index",
                    meta: {
                        name: "信息列表"
                    },
                    component: () => import("../views/Info/index.vue"),
                }
            ]
        },
        {
            path: "/console",
            name: "Console",
            redirect: "index",
            meta: {
                name: "用户管理"
            },
            component: () => import("../views/Layout/index.vue"),
        }
    ]
})