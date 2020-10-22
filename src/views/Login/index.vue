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
              <el-input v-model.number="ruleForm.code" class="item-form" minlength="6" maxlength="6">
              </el-input>
            </el-col>
            <!-- “获取验证码”按钮 -->
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>

        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import{stripscript, emailRegTest, passwordRegTest, codeRegTest} from'@/utils/validate.js'
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
    //element 表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("提交成功");
        } else {
          console.log("提交失败");
          return false;
        }
      });
    },
    //登录与注册选项切换，绑定鼠标click
    toggleMenu(data) {
      this.menuTab.forEach((element) => {
        element.current = false;
      });
      data.current = true;
      //修改model的值，切换“重复密码”是否显示
      this.model= data.type;
      //切换时，清空表单里已经输入的值
      this.$refs["ruleForm" ].resetFields();
    },
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
