<template>
  <div class="add_wrap">
    <modify :buttonText="btnText">
      <Header :backShow="true">新增书单</Header>
    </modify>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Modify from '@/components/Modify.vue'

export default {
  data(){
    return {
      btnText: "确认添加"
    }
  },
  components: {
    Header,
    Modify
  }
}
</script>
<style scoped lang="less">
.add_wrap{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 101;
}
</style>
