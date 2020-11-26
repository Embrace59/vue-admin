import Vue from "vue";//默认 == from "vue/dist/vue.runtime.common.js" 我们要在vue.config.js中修改
import VueCompositionApi from '@vue/composition-api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
//自定义全局组件
import "./icons/index.js"

Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");