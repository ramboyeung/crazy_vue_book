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
          <button @click="add" class="btn">{{buttonText}}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      book:{}
    }
  },
  props: {
    buttonText: {
      type: String,
      default: "更改"
    }
  },
  methods:{
    add(){
      // await this.$api.addBook(this.book);//新增请求
      this.$store.dispatch("addBookAction",this.book);
      this.$router.push("/list");
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
