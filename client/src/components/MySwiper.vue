<template>
  <div class="my-swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in skuImageList" :key="item.id">
          <!-- 两种方案：用图片或者背景图，相对来说背景图好些，无论图片高度是否一致，可以做自适应 -->
          <!-- <img :src="item.imgUrl" alt="" /> -->
          <div class="banner_img" :style="{'background-image':`url(${item.imgUrl})`}"></div>
        </div>
      </div>
      <!--分页器。如果放置在swiper外面，需要自定义样式。-->
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
    </div>
  </div>
</template>

<script>

import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "mySwiper",
  props: ["skuImageList"],
  watch: {
    skuImageList(newVal,oldVal){
      this.$nextTick(()=>{
        new Swiper(".swiper-container", {
          // slidesPerView: 3,
          // spaceBetween: 10,
          // centeredSlides: true,
          loop: true, // 循环模式选项
          // 如果需要前进后退按钮
          /*
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 4000,
            stopOnLastSlide: false, 
            disableOnInteraction:false // 是否在手动切换之后打断自动轮播
          },
          
          autoplay: true,
          speed: 2000,  */
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            // dynamicBullets: true, //激活的圆点放大，未激活的缩小
            clickable :true
          },
          // 设置为true开启Swiper的视差效果，内容在切换时更有层次感。
          parallax: true, 
          // 切换效果
          effect: "fade", 
          // 开启焦距功能：双击slide会放大/缩小，并且在手机端可双指触摸缩放
          zoom: true
        });
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container,.my-swiper{
  width: 100%;
}
// img {
//   width: 100%;
//   height: 150px;
// }
/deep/ .swiper-pagination-bullet,/deep/.swiper-pagination-bullet-active {
  width: 10px;
  height: 10px;
  background: #fff;
}
/deep/.swiper-pagination-bullet-active:after {
  width: 20px;
  height: 20px;
  background: #09f;
}

/*
.swiper-container{
  --swiper-theme-color: #ff6600; // 给小圆点设置颜色的方法一
  --swiper-pagination-color: #fc08ba;// 给小圆点设置颜色的方法二

  --swiper-navigation-color: #00ff33;// 单独设置按钮颜色
  --swiper-navigation-size: 30px;// 设置按钮大小
}
.swiper-pagination{
  bottom: -5px;// 默认分页器到底部有5px
  text-align: right;//小圆点默认到右侧有4px
}
/deep/ .swiper-pagination-bullet {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: #09f;
  opacity: 1;
}
/deep/ .swiper-pagination-bullet-active {
  width: 25px;
  height: 8px;
  border-radius: 10px;
  background: #fff;
}

*/

// 背景图替换图片方案：自动裁剪和自适应
.banner_img{
  width: 100%;
  height: 0;
  padding-bottom: 50%; //  宽:高 = 1:2
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
