<template>
    <div id="layout">
        <LayoutHeader />
        <LayoutMain />
        <LayoutNav />
    </div>
</template>

<script>

import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main'
import LayoutNav from './Components/Nav'

export default {
    //name => 当前模块名称
    name: 'layout',
    //组件，有引入组件时，放置组件名称
    components: { LayoutHeader, LayoutMain, LayoutNav },
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

</style>