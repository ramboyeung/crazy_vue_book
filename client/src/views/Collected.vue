<template>
  <div class="collected_wrap">
    <Header :backShow="true">我的收藏书单</Header>
    <div class="content">
      <div class="book_item_box">
        <div class="title_btn">
          <span class="collect_text">收藏清单</span>
          <div class="right_ac">
            <div class="select_all_box"><input type="checkbox" class="select_all" @click="selectAll" /><b>全选</b></div>
            <button class="cancel_collect_all" @click="cancelAll">全部取消收藏</button>
          </div> 
        </div>
        <BookList :books="collectedBooks" :showCheckbox="true"></BookList>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import BookList from '@/components/BookList.vue'
import { mapGetters } from "vuex"

export default {
  data(){
    return {
      // books:[]
    }
  },
  computed:{
    ...mapGetters([
      'collectedBooks'
    ])
  },
  components: {
    Header,
    BookList
  },
  created(){
    
  },
  methods:{
    cancelCollected(id){
      this.$router.push("/list");
    },
    cancelAll(){
      console.log("已将选中的全部取消收藏")
      this.$router.push("/list");
    },
    selectAll(){
      console.log("已全选")
    }
  }
}
</script>

<style scoped lang="less">
.content{
  .book_item_box{
    width: 100%;
    flex-wrap: wrap;
    background: rgb(244, 247, 244);
    padding:0 0 10px;
    .title_btn{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      .collect_text{//收藏清单字体样式
        margin-left: 5%;
        color: #666;
        font-size:18px;
        font-weight: bold;
        flex:1;
      }
      .right_ac{//全选和全部取消收藏的盒子容器
        display: flex;
        justify-content: space-between;
        flex:1;
        margin-right: 5%;
        .select_all_box{
          // background:#09f;
          display: flex;
          align-items: center;
          .select_all{//单选框样式
            margin-right:5px;
          }
          b{//单选框文本样式
            font-weight: normal;
            font-size: 14px;
          }
        }
        .cancel_collect_all{// 全部取消收藏按钮的样式 
          width: 100px;
          height:30px;
          line-height:30px;
          text-align: center;
          outline: none;
          border: none;
          background:#e23a3a;
          border-radius: 5px;
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
