<template>
    <div id="layout" :class="[menuStatus ? 'close' : 'open']">
        <LayoutHeader></LayoutHeader>
        <LayoutMain></LayoutMain>
        <LayoutNav></LayoutNav>
    </div>
</template>

<script>

import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main'
import LayoutNav from './Components/Nav'

export default {
    name: 'layout',
    
    components: { LayoutHeader, LayoutMain, LayoutNav },
    
    data() {
        return{
        };
    },

    computed:{
        menuStatus(){
            return this.$store.state.app.isCollapse;
        }
    },
    
    created() {},
    mounted() {},

    methods:{},
    //props, watch => 子组件接收父组件参数
    props: {},
    watch: {},
}
</script>

<style  lang="scss" scoped>
</style>