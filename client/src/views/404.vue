<template>
  <div class="w404" :style="{height:height}">
    <div class="test404">
      <div><img src="@/assets/images/404.png" alt=""></div>
      <h2>抱歉，您访问的页面出错了</h2>
      <p>您可能输错了网址，或该网页已删除或不存在</p>
      <div class="go-1">
        <span class="blue" @click="go_index">返回主页</span>
        <span class="blue" @click="up_page">返回上一页</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "w404",
  data() {
    return {
      height:''
    };
  },
  created() {
     this.height = document.documentElement.clientHeight + 'px';
  },
  methods: {
    up_page(){
      history.go(-1);
    },
    go_index(){
      this.$router.push("/");
    },
  },
  mounted() { 
    
  },
};
</script>
 
<style scoped>
.w404{
  width: 100%;
  background: url('@/assets/images/bg_404.jpg') no-repeat;
  background-size: 100% 100%;
}
h2{
      font-size: 32px;
    color: #fff;
    text-align: center;
    letter-spacing: 5px;
    padding-top: 33px;
    padding-bottom: 25px;
}
.test404{
      padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    padding-top: 120px;
}
.test404 img{
    display: block;
    width: 80%;
    margin: auto;
}
.test404 p{
      font-size: 14px;
    color: #fff;
    letter-spacing: 1px;
    text-align: center;
    padding-bottom: 35px;
}
.go-1{
  display: flex;
  width: 80%;
  /* background: #09f; */
  margin: 0 auto;
}
/* 按钮样式 */
.test404 span{
  display: block;
    margin: auto;
    width: 35%;
    height: 30px;
}
/* 按钮样式 */
.blue{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 3px;
    background: #7caced;
    color: #fff;
    letter-spacing: 5px;
    border: 0;
    font-size: 14px;
    padding: 0;
    text-decoration: none;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
    -webkit-transition-property: background;
    transition-property: background;
}
</style>
