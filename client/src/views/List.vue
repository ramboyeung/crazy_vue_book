<template>
  <div class="list_wrap">
    <Header :backShow="true">列表页</Header>
    <div class="content">
      <div class="book_item_box">
        <div class="add_btn">
			<span>图书清单</span>
			<button class="btn" @click="add">新增书单</button>
		</div>
        <BookList :books="books" :showBtn="true"></BookList>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import BookList from '@/components/BookList.vue'
import { mapState } from "vuex"

export default {
  data(){
    return {
      // books:[]
    }
  },
  components: {
    Header,
    BookList
  },
  computed:{
    ...mapState({
      books: (state) => state.books,
    })
  },
  created(){
    // this.books = await this.$api.getBooks();
    this.$store.dispatch("getBooksAction");
  },
  methods:{
    add(){
      this.$router.push("/add");
    },
    modify(id,data){
      console.log(id);
      //如果传递的id是一个对象参数，JSON.stringify(data)是为了防止query传参页面刷新时数据丢失
      this.$router.push({path:"/update",query:{id}});//点击列表页的更改按钮直接跳路由，记得带参跳转,注意写法
    },
    async del(id){
      console.log(id);
      //await this.$api.deleteBook(id);
      // this.$api.getBooks();

      //此处是采用vuex调用后端接口做删除后，前端自己再做删除，即方案2
      this.$store.dispatch("delBookAction",id);//删除完了，前端需要回显（方案1：调用删除接口后再重新调用获取所有的数据的接口回显给前端--->后端做删除，前端不做,请求两次接口； 方案二：调用删除接口后，前端不调用获取数据的接口，自己做删除回显--->前后端都做删除，请求一次接口）
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
    // padding:0 0 10px;
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
		width: 100px;
        margin-right: 8%;
      }
    }
  }
}
</style>
