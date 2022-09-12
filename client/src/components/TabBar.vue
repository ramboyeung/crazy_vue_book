<template>
  <div class="wrap" v-if="$route.meta.showTabBar">
    <router-link to="/home"><i class="iconfont icon-shouye2"></i><span>首页</span></router-link>
    <router-link to="/list"><i class="iconfont icon-liebiao"></i><span>列表</span></router-link>
    <router-link to="/my"><i class="iconfont icon-wode"></i><span>我的</span></router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="less">
.wrap{
  position: fixed;
  bottom: 0;
  left:0;
  height: 50px;
  width: 100%;
  display: flex;
  border-top: 1px solid #ccc;
  background: #fff;
  a{
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    color: #09f;
    &.router-link-active{
      color: red;
    }
  }
}
</style>
