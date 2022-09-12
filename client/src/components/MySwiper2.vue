<template>
  <div class="my-swiper2">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <slot></slot>
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
/**
 * 轮播图之 swiper总结：
 * 如果是引用本地图片，直接在mounted里加载即可
 * 如果是引用线上图片，因为请求是异步的，故轮播图的小圆点会显示不出来。解决方案：不要放moounted里加载，放watch里加载
 * 
 */


import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "mySwiper2",
  props: {
    swiperOption2: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      let mySwiper = new Swiper(
        '.swiper-container',
        this.swiperOption2
        // {这里可以书写一些轮播图的配置，最好不要写死，因为每个地方的轮播图有差异性}
        //      可通过props传入一个对象，放入进来
      );
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container,.my-swiper2{
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

