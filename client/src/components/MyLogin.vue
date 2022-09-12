<template>
  <div class="login_wrap">
    <ul>
      <li>
        <label for="username">用户名：</label><input id="username" type="text" v-model="user.username" />
      </li>
      <li>
        <label for="password">密&ensp;码：</label><input id="password" type="password" v-model="user.password" />
      </li>
      <li>
        <button @click="goLogin" class="btn">登录</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:{}
    }
  },
  methods:{
    async goLogin(){
      let u = await this.$api.checkLogin(this.user);//登录返回的结果
      console.log(u);
      if(u.code){
        localStorage.setItem('token',u.code);
        this.$msg({
          type: "success",
          content: u.msg
        })
        this.$router.push("/my");
      }else{
        this.$msg({
          type: "error",
          content: u.msg
        })
        return;
      }
    }
  }
}
</script>

<style scoped lang="less">
.content{
  ul{
    padding-top: 10%;
    li{
      width: 80%;
      
      margin: 4% auto;
      font-size:16px;
      input{
        border:0;
        outline:0;
        border:solid 1px red;
        width: 70%;
        height: 30px;
        padding-left:5px;
      }
      button{
        width:100px;
        height:30px;
        line-height:30px;
      }
      &.is_hot{
        display: flex;
        align-items: center;
        input{
          width: 15px;
          margin-left: 5px;
          margin-right: 20px;
        }
      }
      &:last-child{
        margin-top: 15%;
        display: flex;
        justify-content: flex-end;
        button{
          margin-right: 30px;
        }
      }
    }
  }
}
</style>