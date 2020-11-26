<template>
     <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    //name => 当前模块名称
    name: "svgIcon",

    //组件，有引入组件时，放置组件名称
    components: {},

    //props => 子组件接收父组件参数
    // props: ['iconClass', 'className'],
    props: {
        // 分页
        iconClass: {
            type: String,  // 定义接收的值类型
            default: ''
        },
        className : {
            type: String,
            default: ''
        }
    },

    //计算属性
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className
            } 
            else {
             return 'svg-icon'
            }
        }
    },

    data() {
        return{

        };
    },

    //创建完成时（生命周期）
    created() {
    },
    //挂载完成时（生命周期）
    mounted() {},

    methods:{},

    watch: {},
}
</script>

<style  lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>