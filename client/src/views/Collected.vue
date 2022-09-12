<template>
  <div class="collected_wrap">
    <Header :backShow="true">我的收藏书单</Header>
    <div class="content">
      <div class="book_item_box">
        <div class="add_btn">
          <span>收藏清单</span>
          <div><input type="checkbox" class="select_all" @click="selectAll" /><b>全选</b></div>
          <button class="btn" @click="cancelAll">全部取消收藏</button>
        </div>
        <div v-for="item in books" :key="item.bookId">
          <div><input type="checkbox" class="select_all" @click="selectAll" /><b>选择</b></div>
          <BookItem :bookItem="item"  :wid="'93.333%'">
            <!-- 插槽使用：决定是否显示收藏图标 -->
            <div class="per_book_btn">
              <button class="btn" @click.stop="cancelCollected(item.bookId)">取消收藏</button>
            </div>
          </BookItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import BookItem from '@/components/BookItem.vue'
import { mapState } from "vuex"

export default {
  data(){
    return {
      // books:[]
    }
  },
  computed:{
    books(){
      return this.$store.state.books.filter(item=>item.collected);
    }
  },
  components: {
    Header,
    BookItem
  },
  created(){
    // this.books = await this.$api.getBooks();
    this.$store.dispatch("getBooksAction");
  },
  methods:{
    cancelCollected(id){
      this.$router.push("/list");
    },
    cancelAll(){
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
    .add_btn{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      span{
        margin-left: 25%;
        color: #666;
        font-size: 18px;
        font-weight: bold;
      }
      .btn{
        margin-right: 8%;
      }
    }
    .per_book_btn{
      margin-top: 5px;
      .btn:nth-child(1){
        width: 80px;//App.vue里默认是50,自行调整
        background: #e23a3a;
      }
    }
  }
}
</style>
