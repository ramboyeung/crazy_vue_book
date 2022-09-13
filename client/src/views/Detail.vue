<template>
  <div class="detail_wrap">
    <Header :backShow="true">详情页</Header>
    <div class="content">
      <div class="detail_item">
        <h2>详情{{$route.params.bid}}</h2>
        <h3>书名：{{book.bookName}}</h3>
        <p>封面：<img :src="book.bookCover" alt=""></p>
        <h3>介绍：</h3>
        <p>{{book.bookInfo}}</p>
        <h3>发行价：<span>{{book.bookPrice}}</span></h3>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import { mapState } from "vuex"

export default {
  data(){
    return {
      book: {}
    }
  },
  computed:{
    ...mapState({
      books: (state) => state.books,
    })
  },
  components:{
    Header
  },
  async created(){
    console.log("====详情页======",this.$route.params)
    //let books = await this.$api.getBooks();
    let obj = this.books.find(item=>item.bookId==this.$route.params.bid);
    this.book=obj;
    // this.book = await this.$api.findOneBook(this.$route.params.bid);
    console.log("====详情页======",this.book);
  }
}
</script>

<style scoped lang="less">
.content{
  margin-top: 50px;
  // background: #ccc;
  .detail_item{
    padding:15px;
    // background: #09f;
    &>*{
      padding-bottom: 10px;
    }
  }
}
</style>
