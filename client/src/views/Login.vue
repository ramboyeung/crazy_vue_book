<template>
  <div class="action_wrap">
    <Header>{{isLoginPage ? '登录' : '注册'}}</Header>
    <div class="content">
      <div class="logOrReg_box">
        <h2 class="title">
          <span @click="changeCom('MyLogin',true)" :class="isLoginPage?'login_tab active':'login_tab'">登录</span>
          <span @click="changeCom('MyRegister',false)" :class="isLoginPage?'reg_tab':'reg_tab active'">注册</span>
        </h2>
        <keep-alive>
          <component :is="componentName"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import MyLogin from "@/components/MyLogin.vue"
import MyRegister from "@/components/MyRegister.vue"
export default {
  data(){
    return {
      componentName: "MyLogin",
      isLoginPage: true
    }
  },
  components:{
    Header,
    MyLogin,
    MyRegister
  },
  methods:{
    async goLogin(){
      let u = await this.$api.checkLogin(this.user);//登录返回的结果
      console.log(u);
      if(u.code){
        this.$router.push("/my");
      }else{
        return;
      }
    },
    changeCom(name,b){//动态传参，切换动态组件的名字，控制标题显示不同字样
      this.componentName = name;
      this.isLoginPage = b;
      console.log(this.isLoginPage);
    }
  }
}
</script>

<style scoped lang="less">
.active{
  border-bottom:5px solid red;
  padding-bottom:5px;
  color:#1a1a1a;
}

.logOrReg_box{
  height: calc(100%-50px);
  .title{
    padding:20px 0 0 20px;
    box-sizing: border-box;
    font-size:24px;
    color:#999;
    .login_tab{
      margin-right:20px;
    }
  }
}
</style>