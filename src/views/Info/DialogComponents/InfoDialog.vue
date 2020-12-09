<template>
    <div class="info-dialog">
        <el-dialog :modal-append-to-body='false' title="新增" :visible.sync="dialogInfoFlag" @close="closeInfoDialog" width="560px">
           <el-form :model="form">
               <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择类型">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.name" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="概括" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.name" placeholder="请输入"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeInfoDialog">取  消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确  定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'infoDialog',
    data() {
        return{
            dialogInfoFlag: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '45px'
        }
    },
    
    methods:{
        closeInfoDialog(){
            this.dialogInfoFlag = false;
            this.$emit('update:flag', false);
        }
    },

    props:{
        flag: {
            type: Boolean,
            default: false
        }
    },

    watch:{
        flag:{
            handler(newValue, oldValue){
                this.dialogInfoFlag = newValue;
            }
        }
    }
}
</script>

<style scoped>
  
</style>