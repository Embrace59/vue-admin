<template>
    <div id="nav-wrap">
        
    </div>
</template>

<script>
export default {
    //name => 当前模块名称
    name: "Login",
    //组件，有引入组件时，放置组件名称
    components: {},
    //data
    data() {

    },
     //创建完成时（生命周期）
    created() {},
    //挂载完成时（生命周期）
    mounted() {},
    //method
    methods:{

    },
    //props, watch => 子组件接收父组件参数
    props: {},
    watch: {},
}
</script>

//css
<style  lang="scss" scoped>

@import "../../../styles/config.scss";

#nav-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: $navMenu;
    height: 100vh;
    background-color: #344a5f;
}
</style>