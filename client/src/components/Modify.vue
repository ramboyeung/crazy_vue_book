<template>
  <div class="add_wrap">
    <slot></slot>
    <div class="content">
      <ul>
        <li>
          <label for="bookCover">&ensp;封&emsp;面&ensp;：</label><input id="bookCover" type="text" v-model.trim="book.bookCover" />
        </li>
        <li>
          <label for="bookName">&ensp;书&emsp;名&ensp;：</label><input id="bookName" type="text" v-model="book.bookName" />
        </li>
        <li>
          <label for="bookInfo">&ensp;简&emsp;介&ensp;：</label><input id="bookInfo" type="text" v-model="book.bookInfo" />
        </li>
        <li class="is_hot">
          <span>是否热门：</span>
          <label for="hotIs">是</label><input type="radio" id="hotIs" name="isHot" :value="true" v-model="book.isHot">
          <label for="htoNo">否</label><input type="radio" id="htoNo" name="isHot" :value="false" v-model="book.isHot">
        </li>
        <li>
          <label for="bookPrice">&ensp;价&emsp;格&ensp;：</label><input id="bookPrice" type="text" v-model.number="book.bookPrice" />
        </li>
        <li>
          <button @click="update($route.query.id,book)" class="btn">{{buttonText}}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data(){
    return {
      book:{}
    }
  },
  props: {
    buttonText: {
      type: String,
      default: "更改" //如果父组件不传，则按钮提交文案默认就是：更改
    }
  },
  computed:{
    ...mapState({
      books: (state) => state.books,
    })
  },
  created(){
    console.log(this.$route.query);
    console.log(this.books);//created里直接this.$store.state.books获取不到值，为空数组啊，mounted里虽然能够拿到，但是数据长度不为0，但是页面还是用不了数据！！！
    console.log(this.books.length);
    let db = this.books.find(item=>item.bookId==this.$route.query.id);//拷贝一份，为了不让用户刷新时报错
    this.book = {...db};//页面一加载就赋上值
  },
  watch: {
    // 监听用户直接输入路由进行刷新
    $route:{
      handler(val,oldval){
        // console.log(val);//新路由信息
        // console.log(oldval);//老路由信息
        // this.id = this.$route.query.id
        //this.$router.go(0)//页面刷新
      },
      // 深度观察监听
      // deep: true,
      // immediate: true
    }
  },
  methods:{
    update(id,book){
      // await this.$api.updateBook(id,book);//新增请求
      this.$store.dispatch("updateBookAction",id,book);
      this.$router.push("/list");//vuex里发异步请求后去把vuex里数据变更了，所以只需要跳转即可
    }
  }
}
</script>

<style scoped lang="less">
.content{
  margin: 50px 0;
  ul{
    padding-top: 10%;
    li{
      width: 80%;
      
      margin: 4% auto;
      font-size:16px;
      input{
        border:0;
        outline:0;
        border:solid 1px red;
        width: 70%;
        height: 30px;
        padding-left:5px;
      }
      button{
        width:100px;
        height:30px;
        line-height:30px;
      }
      &.is_hot{
        display: flex;
        align-items: center;
        input{
          width: 15px;
          margin-left: 5px;
          margin-right: 20px;
        }
      }
      &:last-child{
        margin-top: 15%;
        display: flex;
        justify-content: flex-end;
        button{
          margin-right: 30px;
        }
      }
    }
  }
}
</style>
