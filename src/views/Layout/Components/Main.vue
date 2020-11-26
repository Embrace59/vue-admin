<template>
    <div id="main-wrap">
        <div class="main-content">
            <div>{{aaa}}</div>
            <div>{{bbb}}</div>
            <div>{{ccc}}</div>
        </div>
    </div>
</template>

<script>
export default {
    //name => 当前模块名称
    name: "Main",
    //组件，有引入组件时，放置组件名称
    components: {},
    //data
    data() {
        ccc: 123
        return{
            aaa: this.$store.state.login.aaa,
            bbb: 123
        };
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
    background-color: #fff;
    @include webkit(box-sizing, border);
    @include webkit(transition, all .3s ease 0s);//过渡
}
.open{
    #main-wrap{
        left: 200px;
    }
}

.close{
    #main-wrap{
        left: 64px;
    }
}

.main-content{
    width: 100%;
    height: 100%;
    @include webkit(box-sizing, border-box);
}

.content{
    width: 100%;
    height: 100%;
    padding-top: 15px;
    padding-left: 100px;
    padding-right: 15px;
    @include webkit(box-sizing, border-box);
    background-color: #fff;
}

h1 {
  margin: 0;
  background: #cff;
}
#div1{
	margin: 40px 0 25px 0;
  	background: #999;
}
#div2{
	margin: 20px 0 10px 0;
	background: #cff;
}

</style>



