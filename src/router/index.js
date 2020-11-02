import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/index.vue";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "login"
        },
        {
            path: "/login",
            name: "Login",
            component : () => import("../views/Login/index.vue")
        },
        {
            path: "/console",
            name: "Console",
            component: () => import("../views/Layout/index.vue"),
            children: [
                {
                    path: "/console",
                    name: "Console",
                    component: () => import("../views/Console/index.vue"),
                }
            ]
        }
    ]
})