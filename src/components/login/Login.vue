<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <img src="~assets/logo.png" style="width:100% ;height:100% ;border-radius:50%;background-color:#eee"/>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="0px"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-search" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-search" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="loginBtn">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度需要在3到6位之间", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度需要在3到6位之间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
    loginBtn() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const {data : res} = await this.$http.post("login", this.loginForm);
        if(res.meta.status != 200) {
          this.$message.error('登录失败');
        }else{
          window.sessionStorage.setItem("token",res.data.token)
          this.$message.success('登录成功');
          this.$router.push('/home')
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
}
.login-box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.avatar-box{
  width: 130px;
  height: 130px;
  border: 1px solid #eeeeee;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
}
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>