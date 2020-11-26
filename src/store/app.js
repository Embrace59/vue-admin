const app = {
    //state是存储的单一状态，是存储的基本数据
    state: {
        isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
    },

    //store的计算属性，对state加工，是派生出来的数据，就像computed
    //getter返回值会根据他的依赖缓存起来，且只有当他的依赖发生改变才会重新计算
    getters: {
    },

    //mutations提交更改属性，使用store.commit方法更改state存储的状态。（mutations同步函数）
    mutations: {
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse;
            //html5本地存储
            sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
        }
    },

    //actions可以提交mutations，而不是直接变更状态（actions可以包含任何异步操作）
    //第一个参数是默认的，必须要有的，但是名称可以自己取
    //mutations专注修改state
    //action负责业务代码，异步请求
    actions: {
        login(context, requestData) {
            return new Promise((resolve, reject) => {
                Login(requestData).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
}

export default app;