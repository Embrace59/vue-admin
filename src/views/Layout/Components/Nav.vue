<template>
    <div id="nav-wrap">
        <el-menu 
            default-active="routeActive" 
            class="el-menu-vertical-demo"  
            :collapse="isCollapse" 
            background-color="transparent" 
            text-color="#fff" 
            active-text-color="#fff" 
            router>
            <template v-for="(item, index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
                    <!-- 一级菜单-->
                    <template slot="title">
                        <!-- <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" /> -->
                        <svg-icon iconClass="menu" className="menu"/>
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
    name: "Console",

    components: {},
    
    data() {
        return {
            routers: null
        };
    },

    created() {
        this.getRouters();
    },

    mounted() {
    },

    computed:{
        //折叠导航栏
        isCollapse(){
            return this.$store.state.app.isCollapse;
        },
        //监听被选中的路由
        routeActive(){
            const activeRoute = this.$route;
            const { path } = activeRoute;
            return path;
        }
    },

    methods:{
        /**
         * 获取路由列表
         */
        getRouters(){
            // this.$router.options 可以获取到 路由列表
            this.routers = this.$router.options.routes;
        }
    },
    
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
    height: 100vh;
    background-color: #344a5f;
    @include webkit(transition, all .3s ease 0s);
    svg{
        font-size: 20px;
        margin-right: 10px;
    }
}

.open{
    #nav-wrap{
        width: $navMenu;
    }
}

.close{
    #nav-wrap{
        width: $navMenuMin;
    }
}


</style>