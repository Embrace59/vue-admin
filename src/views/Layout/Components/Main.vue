<template>
    <div id="main-wrap">
        <router-view/>
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

#main-wrap{
    position: fixed;
    left: 200px;
    top: 75px;
    right: 0;
    bottom: 0;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    background-color: green;
    -webkit-box-sizing: border;
}

</style>