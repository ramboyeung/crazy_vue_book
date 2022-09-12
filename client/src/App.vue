<template>
  <div id="app">
    <router-view/>
    <TabBar />
  </div>
</template>

<script>
 import TabBar from '@/components/TabBar.vue';
 export default {
  components: {
    TabBar
  }
 }
</script>

<style lang="less">
@import url(@/assets/css/reset.css);
.content{
  margin: 50px 0;
}
.btn{
  width: 50px;
  height:30px;
  line-height:30px;
  text-align: center;
  outline: none;
  border: none;
  background: #09f;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
}
</style>
