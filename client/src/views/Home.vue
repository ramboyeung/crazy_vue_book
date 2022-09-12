<template>
  <div class="home_wrap">
    <Header>首页</Header>
    <div class="content">
      <MySwiper :skuImageList="imgList" />
      <div class="books">
        <h2>热门图书</h2>
        <div class="book_item_box"><book-item :bookItem="item" v-for="item in books" :key="item.bookId" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import MySwiper from '@/components/MySwiper.vue'
import BookItem from '@/components/BookItem.vue'

export default {
  data(){
    return {
      imgList: [
        // {imgUrl: require("@/assets/images/swiper01.jpg"),id:1},
        // {imgUrl: require("@/assets/images/swiper02.jpg"),id:2},
        // {imgUrl: require("@/assets/images/swiper03.jpg"),id:3}
      ],
      books:[
        // {
        //   bookId: 1,
        //   bookName: "Vue开发实战",
        //   bookInfo: "一个人的武林",
        //   bookPrice: 32.8,
        //   bookCover: "https://img11.360buyimg.com/n1/s200x200_jfs/t1/19709/14/2822/206853/5c21adb6E7c9bb79e/5b840bc23c3ed2dc.jpg.avif"
        // }
      ]
    }
  },
  async created(){
    this.imgList = await this.$api.getSliders();//注意如果后端做了JSON.stringify,前端一定要JSON.parse，否则请求会报路径的/undefined
    // this.books = await this.$api.getHot();
    let allBook = await this.$api.getBooks();
    this.books = allBook.filter(item=>item.isHot);
  },
  components: {
    Header,
    MySwiper,
    BookItem
  }
}
</script>

<style scoped lang="less">
.books{
  h2{
    color: #1a1a1a;
    font-size: 20px;
    font-weight: bold;
    padding: 10px 0 10px 15px;
  }
  
  .book_item_box{
    display: flex;
    justify-content: flex-start;
    width: 100%;
    flex-wrap: wrap;
    background: rgb(244, 247, 244);
    padding-bottom:10px;
  }
}
</style>
