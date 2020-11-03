<template>
    <div id="nav-wrap">
        <el-menu 
            default-active="1-4-1" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="isCollapse" 
            background-color="transparent" 
            text-color="#fff" 
            active-text-color="#fff" 
            router>
            <template v-for="(item, index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
                    <!-- 一级菜单-->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">{{ item.meta.name }}</span>
                    </template>
                    <!-- 二级菜单-->
                    <template v-for="subItem in item.children">
                        <el-menu-item v-if="!subItem.hidden" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    //name => 当前模块名称
    name: "Console",
    //组件，有引入组件时，放置组件名称
    components: {},
    //data
    data() {
        return {
            isCollapse: false,
            routers: null
        };
    },

    //创建完成时（生命周期）
    created() {
        this.getRouters();
    },

    //挂载完成时（生命周期）
    mounted() {},

    //method
    methods:{
        //element 所需的method
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        
        getRouters(){
            // this.$router.options 可以获取到 路由列表
            this.routers = this.$router.options.routes;
        }
        
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