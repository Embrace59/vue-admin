<template>
    <div id="header-wrap">
        <div class="pull-left header-icon" @click="navMenuState">
            <svg-icon iconClass="menu" className="menu"/>
        </div>
        <div class="pull-right">
            <div class="user-info pull-left">
                {{username}}
            </div>
            <div class="header-icon pull-left" @click="logout">
                <svg-icon iconClass="exit" className="exit"/>
            </div>
        </div>
    </div>
   
</template>

<script>
export default {
    //name => 当前模块名称
    name: "LayoutHeader",
    //组件，有引入组件时，放置组件名称
    components: {},
    //data
    data() {
        return{};
    },
     //创建完成时（生命周期）
    created() {},
    //挂载完成时（生命周期）
    mounted() {},
    
    computed:{
        username(){
            return this.$store.state.app.username;
        }
    },
    
    methods:{
        //每点击一次“折叠左侧菜单栏图标”，改变一次vuex的isCollapse
        navMenuState() {
            this.$store.commit('app/SET_COLLAPSE');
        },
        //Logout
        logout(){
            this.$store.dispatch("app/logout").then(response => {
                console.log(response.resCode)
                this.$message({
                    message: "退出成功！",
                    type: "success"
                });
                //Route back to login view
                this.$router.push({
                    name: 'Login'
                });
            }).catch(err=>{
                console.log("aaa")
                console.log(response.resCode)
                reject();
            })
        }
    },
    //props, watch => 子组件接收父组件参数
    props: {},
    watch: {},
}
</script>

<style  lang="scss" scoped>
#header-wrap{
    position: fixed;
    top: 0;
    right: 0;
    height: 75px;
    background-color: #fff;
    line-height: 75px;
    @include webkit(box-shadow, 0 3px 50px 0 rgba(0, 0, 0, 0.1));//阴影
    @include webkit(transition, all .3s ease 0s);//过渡
}

.open{
    #header-wrap{
        left: $navMenu;
    }
}

.close{
    #header-wrap{
        left: $navMenuMin;
    }
}

.header-icon{
    padding: 0 32px;
    svg{
        margin-bottom: -9px;
        font-size: 30px;
        cursor: pointer;
    }
}

.user-info{
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
}

</style>