<template>
  <div class="update_wrap">
    <modify>
      <!-- 又是插槽！ -->
      <Header :backShow="true">修改页</Header>
    </modify>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Modify from '@/components/Modify.vue'

export default {
  components: {
    Header,
    Modify
  }
}
</script>
