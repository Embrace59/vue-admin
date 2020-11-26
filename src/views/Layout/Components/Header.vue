<template>
    <div id="header-wrap">
        <div class="pull-left header-icon" @click="navMenuState">
            <svg-icon iconClass="menu" className="menu"/>
        </div>
        <div class="pull-right">
            <div class="user-info pull-left">
                管理员
            </div>
            <div class="header-icon pull-left"><svg-icon iconClass="exit" className="exit"/></div>
        </div>
    </div>
   
</template>

<script>
export default {
    //name => 当前模块名称
    name: "header",
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
    //method
    methods:{
        navMenuState() {
            this.$store.commit('SET_COLLAPSE');
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