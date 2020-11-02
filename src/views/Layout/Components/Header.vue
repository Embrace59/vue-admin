<template>
    <div id="header-wrap">
        11111111111111111111111111111111111111111111111111111111
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

<style  lang="scss" scoped>
#header-wrap{
    position: fixed;
    top: 0;
    right: 0;
    left: $navMenu;
    height: 75px;
    background-color: #fff;
    line-height: 75px;
    -webkit-box-shadow: 0 3px 50px 0 rgba(0, 0, 0, 0.1);
    
}

</style>