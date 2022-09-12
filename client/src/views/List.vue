<template>
  <div class="list_wrap">
    <Header :backShow="true">列表页</Header>
    <div class="content">
      <div class="book_item_box">
        <div class="add_btn"><span>图书清单</span><button class="btn" @click="add">新增书单</button></div>
        <BookItem :bookItem="item" v-for="item in books" :key="item.bookId" :wid="'93.333%'">
          <!-- 插槽使用：决定是否显示收藏图标 -->
          <p class="per_book_btn">
            <button class="btn" @click.stop="del(item.bookId)">删除</button><button class="btn" @click.stop="modify(item.bookId)">修改</button>
          </p>
        </BookItem>
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
    ...mapState({
      books: (state) => state.books,
    })
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
    add(){
      this.$router.push("/add");
    },
    async modify(id){
      console.log(id)
      await this.$api.updateBook(id);
      this.$router.push("/list");
    },
    async del(id){
      console.log(id)
      await this.$api.deleteBook(id);
      this.$router.push("/update");
    },
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
        background: #e23a3a;
      }
      .btn:nth-child(2){
        margin-left: 10px;
      }
    }
  }
}
</style>
