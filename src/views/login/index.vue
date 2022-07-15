<template>
  <div class="login">
    <div class="login-top">欢迎登陆</div>
    <div class="login-content">
      <input type="text" name="phone" placeholder="请输入手机号" class="phone" v-model="loginData.phone">
      <input type="password" name="password" placeholder="请输入密码" class="password" v-model="loginData.password">
    </div>
    <button @click="Login">登录</button>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginData = reactive({
      phone: "",
      password: "",
    });

    const Login = async () => {
      let res = await store.dispatch("getLogin", {
        phone: loginData.phone,
        password: loginData.password,
      });
      console.log(res);
      if (res.data.code === 200) {
        store.commit("updateIsLogin", true);
        store.commit("updateToken", res.data.token);
        router.push("/infoUser");
      } else {
        alert("手机号码或密码错误");
        loginData.password = "";
      }
    };

    return { loginData, Login };
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(248, 97, 97);
  .login-top {
    color: #fff;
    font-size: 0.8rem;
    padding: 2rem 0;
  }
  .login-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .phone,
    .password {
      width: 5.2rem;
      height: 1rem;
      margin-bottom: 1rem;
      border: none;
    }
  }
  button {
    width: 2rem;
    height: 0.8rem;
  }
}
</style>