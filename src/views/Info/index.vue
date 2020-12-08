<template>
    <div>
        <!-- 分类，日期，关键字，搜索，新增-->
        <el-row >
            <el-col :span="5">
                <div class="label-wrap category">
                    <label for="">分类：</label>
                    <div class="wrap-content">
                        <el-select v-model="value" placeholder="请选择" size="mini">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="label-wrap date">
                    <label for="">日期：</label>
                    <div class="wrap-content">
                         <el-date-picker
                            v-model="value2"
                            type="datetimerange"
                            align="right"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']"
                            size="mini">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="label-wrap key-work">
                    <label for="">关键字：</label>
                    <div class="wrap-content" >
                        <el-select v-model="value" placeholder="" size="mini">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="search">
                    <el-input v-model="search_keyWord"  size="mini" class="input_content" placeholder="输入搜索内容"></el-input>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="search-button">
                    <el-button type="primary" plain size="mini" >搜索</el-button>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" size="mini" style="float: right">新增</el-button>
            </el-col>
        </el-row>
        <!-- 表格数据 -->
        <div class="black-space-30"></div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="title" label="标题" width="480"></el-table-column>
            <el-table-column prop="categoryId" label="类目" width="130"></el-table-column>
            <el-table-column prop="createDate" label="日期"  width="250"></el-table-column>
            <el-table-column prop="user" label="管理人"  width="100"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="mini">删除</el-button>
                    <el-button type="danger" plain size="mini">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--底部分页 -->
        <div class="black-space-30"></div>
        <el-row>
            <el-col :span="10">
                <el-button type="danger" size="mini">批量删除</el-button>
            </el-col>
            <el-col :span="14">
                <el-pagination
                    class="pull-right"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 50]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="1000">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "infoIndex",
    
    components: {},
    
    data() {
        return{

            options: [
            {
                value: '选项1',
                label: '黄金糕'
            }, 
            {
                value: '选项2',
                label: '双皮奶'
            }, 
            {
                value: '选项3',
                label: '蚵仔煎'
            }],

            tableData: [
            {
                title: '2016-05-02',
                categoryId: '王小虎',
                createDate: '上海市普陀区金沙江路 1518 弄',
                user: 'aaa'
            },
            {
                title: '2016-05-02',
                categoryId: '王小虎',
                createDate: '上海市普陀区金沙江路 1518 弄',
                user: 'aaa'
            },
            {
                title: '2016-05-02',
                categoryId: '王小虎',
                createDate: '上海市普陀区金沙江路 1518 弄',
                user: 'aaa'
            }],
            value: '',
            value2: '',
            search_keyWord: ''
        };
    },
    
    created() {},
    
    mounted() {},

    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
    },
    //props, watch => 子组件接收父组件参数
    props: {},
    watch: {},
}
</script>

<style  lang="scss" scoped>
@import "../../styles/config.scss";

.label-wrap{
    &.category{ @include labelDom(left, 11, 25); }
    &.date{ @include labelDom(right, 11, 25); }
    &.key-work{ @include labelDom(right, 11, 25); }
    .key-work{
        .el-input--suffix .el-input__inner{
            padding-right: 0px;
        }
    }
}

.input_content{
    width: 140px;
    margin-right: 7px;
}

</style>