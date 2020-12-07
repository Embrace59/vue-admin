import { Login, Logout } from "@/api/login.js";
import { cookieSetToken, cookieRemoveToKen, cookieRemoveUserName, cookieSetUserName, cookieGetUserName } from "@/utils/app.js";

const state = {
    //JSON.parse()，JSON字符串转js对象
    //{"a": "hello", "b":"bye"} => {a: "hello", b:"bye"}
    //sessionStorage.getItem => BOM的一个API => window.sessionStorage.getItem()

    //表示后台管理页面的nav列表是否展开，默认值为false（展开）
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,//sessionStorage => 页面关闭就被清理
    token: '',
    username: cookieGetUserName() || ""
}

const getters = {
    isCollapse: state => state.isCollapse,
    username: state => state.username
}

const mutations = {
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse;
        //html5本地存储，key和value都要是JSON字符串
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));//JSON.stringfy(), js对象转JSON字符串 {a: "hello", b:"bye"} => {"a": "hello", "b":"bye"}
    },

    SET_TOKEN(state, value) {
        state.token = value;
    },

    SET_USERNAME(state, value) {
        state.username = value;
    }
}

const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then(response => {
                const responseData = response.data.data;
                //Set token and username in vuex
                content.commit('SET_TOKEN', responseData.token);
                content.commit('SET_USERNAME', responseData.username);
                //Set token and username in cookie
                cookieSetToken(responseData.token);
                cookieSetUserName(responseData.username);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
            Logout().then(response => {
                const responseData = response.data;
                resolve(responseData);
            }).catch(error => {
                reject(error);
            });
        });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};