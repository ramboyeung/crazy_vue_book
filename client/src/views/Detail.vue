<template>
  <div class="detail_wrap">
    <Header :backShow="true">详情页</Header>
    <div class="content">
      详情{{$route.params.bid}}
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
export default {
  data(){
    return {

    }
  },
  components:{
    Header
  }
}
</script>

<style scoped lang="less">

</style>
