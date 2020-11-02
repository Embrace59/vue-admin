<template>
  <div id="login">
    <div class="login-wrap">
      <!-- 登陆与注册切换 -->
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{ current: item.current }" @click="toggleMenu(item)">{{ item.txt }}</li>
      </ul>

      <!-- form表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
        <!-- 邮箱输入框 -->
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input type="txt" v-model="ruleForm.username" autocomplete="off" class="item-form"></el-input>
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" class="item-form" minilength="6" maxlength="20"></el-input>
        </el-form-item>

        <!-- 重复密码输入框 -->
        <el-form-item prop="repeatedPassword" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.repeatedPassword" autocomplete="off" class="item-form" minilength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="10">
            <!-- 验证码输入框 -->
            <el-col :span="15">
              <el-input v-model="ruleForm.code" class="item-form" minlength="6" maxlength="6">
              </el-input>
            </el-col>
            <!-- “获取验证码”按钮 -->
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms()" :disabled="codeButton.status">{{codeButton.txt}}</el-button>
            </el-col>
          </el-row>

        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" :disabled="loginButonStatus">{{model === 'login' ? "登录" :  "注册"}}</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>

import sha1 from 'js-sha1';
import {GetSms, Register, Login} from '@/api/login.js';
import service from '@/utils/request.js';
import{stripscript, emailRegTest, passwordRegTest, codeRegTest} from'@/utils/validate.js';

export default {
  //name => 当前模块名称
  name: "Login",
  //组件，有引入组件时，放置组件名称
  components: {},
  //data
  data() {
    //element表单数据

    //邮箱格式验证
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } 
      else if(!emailRegTest(value)){
        callback(new Error("邮箱格式错误"));
      }
      else{
        callback();
      }
    };

    //密码格式验证
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("密码不能为空"));
      } 
      else if (!passwordRegTest(value)) {
        callback(new Error("密码为6-20位数字+字母"));
      } 
      else {
        callback();
      }
    };

    //重复密码验证
    var validateRepeatedPassword = (rule, value, callback) => {
      this.ruleForm.repeatedPassword = stripscript(value);
      value = this.ruleForm.repeatedPassword;
      //用了v-shou隐藏重复密码输入框，如果是登录界面，就不用再重复验证密码了
      if(this.model === 'login'){
        callback();
      }
      if (value === "") {
        callback(new Error("密码不能为空"));
      } 
      else if (value != this.ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } 
      else {
        callback();
      }
    };

    //验证码格式验证
    var validateCode = (rule, value, callback) => {
      let reg = /^[a-z0-9]{6}$/;
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } 
      else if (!reg.test(value)) {
        callback(new Error("验证码格式不正确"));
      } 
      else {
        callback();
      }
    };

    return {
       //登录、注册切换所需数据
     menuTab: [
        { txt: "登录", current: true, type: 'login' },
        { txt: "注册", current: false, type: 'register' },
      ],
      isActive: true,
      model: 'login',
      //登录、注册按钮禁用
      loginButonStatus: true,
      //获取验证码按钮禁用
      codeButton:{
        status: false,
        txt: "获取验证码"
      },
      //倒计时
      timer: null,
      //element return 数据
      ruleForm: {
        username: "",
        password: "",
        repeatedPassword:"",
        code: "",
      },
      //表单验证数据
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        repeatedPassword: [{ validator: validateRepeatedPassword, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      }
    };
  },
  //创建完成时（生命周期）
  created() {},
  //挂载完成时（生命周期）
  mounted() {},
  //method
  methods: {

    /**
     * 登录与注册选项高光切换，绑定鼠标click
     */
    toggleMenu(data) {
      //先把所有的current改为false
      this.menuTab.forEach((element) => {
        element.current = false;
      });
      //鼠标点击了这个menuTab，所以要吧current改为true，才会变成选定状态的css
      data.current = true;
      //修改model的值，切换menuTab时，“重复密码”是否显示
      this.model= data.type;
      //切换时，清空表单里已经输入的值
      this.$refs["ruleForm" ].resetFields();
      //切换时，把data里的数据也重置一下
      ruleForm.username = '';
      ruleForm.password = '';
      ruleForm.repeatedPassword = '';
      ruleForm.code = '';
    },

    /**
     * element 表单提交
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.model === 'login'){
            //登录接口封装
            this.login();
          }
          else{
            //注册接口封装
            this.register();
          }
        } else {
          alert("提交失败");
          return false;
        }
      });
    },

    /**
     * 登录
     */
    login(){
      let repuestData = {//username, password, code都是用户手动输入的
          username: ruleForm.username,
          password: sha1(this.ruleForm.password),
          code: ruleForm.code
      }
      //登录接口
      Login(data).then(response => {
        console.log('response');
        this.$router.push({
          name: 'Console'
        });
      }).catch(error => {
         console.log('登录接口出错');
      });
    },

    /**
     * 注册
     */
    register(){
      let data = {//username, password, code都是用户手动输入的
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code,
        model: 'register'
      }
      //注册接口
      Register(data).then(response => {
        let responseData = response.data;
        this.$message.success("注册成功");
      }).catch(error => {
        //注册失败
      });
    },

    /**
     * 获取验证码
     * username: xxx@xx.com
     * module: register / login 表示的是按钮上面的文字
     */
    getSms(){
      //检测邮箱是否为空
      if(this.ruleForm.username == ''){
        this.$message.error("邮箱不能为空");
        return false;
      }
      //验证邮箱格式
      if(!emailRegTest(this.ruleForm.username)){
        this.$message.error("邮箱格式不正确");
      }
      //设置请求参数
      let requestData = {
        username: this.ruleForm.username,
        model: this.model
      };
      //修改获取验证码按钮状态
      this.codeButton.status = true;//true，这个按钮不能用
      this.codeButton.txt = '发送中';
      //get请求，向后台请求验证码
       GetSms(requestData).then((response)=>{
          let responseData = response.data;
          this.$message({
            message: responseData.message,//打印出这个message，说明验证码发送成功了
            type: 'success'
          });
          //发送了验证码之后，登陆/注册按钮就能用了
          loginButonStatus = false;
          //倒计时60秒
          this.countDown(60);
          //倒计时完成，把获取验证码的按钮改变状态
          this.codeButton.status = false;
          this.codeButton.txt = '获取验证码';
        }).catch(error=>{
          console.log(error);
        }); 
    },

    /**
     * 倒计时
     * setInterval()函数将返回一个标识符 ID，这个 ID 是唯一的(一般是整数，从 1 开始，每调用一次 setInterval() 就加 1)。
     * 如果需要 setInterval() 执行的函数或代码尚未执行，我们可以通过 clearInterval() 函数来取消该执行操作，
     * clearInterval() 需要接收一个参数，这个参数就是 setInterval() 返回的标识符ID。
     */
    countDown(num){
      //在开启定时器之前，判断是否已经存在了一个定时器，如果有，就清除掉这个多余的定时器
      if(this.timer){
        clearInterval(this.timer);
      }
      let timeNum = num;
      this.timer = setInterval(()=>{
        timeNum--;
        if(timeNum === 0){//倒计时完成了，清除掉这个定时器
          clearInterval(this.timer);
        }
        else{//倒计时还没完成，继续倒计时
          codeButton.txt = '倒计时${timeNum}秒'
        }
      }, 1000)
    },

    /**
     * 清楚倒计时
     */
    clearCountDown(){
      codeButton.status = false;
      codeButton.txt = '获取验证码';
      clearInterval(this.timer);
    }
  
  },
  //props, watch => 子组件接收父组件参数
  props: {},
  watch: {},
};
</script>

<style lang="scss" scoped>

.block {
  display: block;
  width: 100%;
}

#login {
  height: 100vh;
  background-color: rgb(192, 55, 158);
}

.login-wrap {
  width: 330px;
  margin: auto;
  background-color: grey;
}

.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 13px;
  }
}

.login-btn {
  margin-top: 19px;
}
</style>




