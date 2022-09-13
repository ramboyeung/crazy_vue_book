<template>
  <div class="wrap">
    <div>
      <span><slot></slot></span>
      <i class="iconfont icon-ffanhui-" v-if="backShow" @click="goBack"></i>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    backShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="less">
.wrap{
  position: fixed;
  top: 0;
  left:0;
  height: 50px;
  min-height:50px;
  line-height: 50px;
  text-align: center;
  width: 100%;
  background: rgb(68, 0, 255);
  color: #fff;
  z-index: 100;
  span{
    font-weight: bold;
	font-size: 18px;
  }
  i{
    position: absolute;
    left: 20px;
  }
}
</style>
