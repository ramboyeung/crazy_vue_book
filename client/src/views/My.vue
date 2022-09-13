<template>
  <div class="my_wrap">
    <!-- <Header>我的资料</Header> -->
    <div class="content">
      <div class="my_top">
        <span class="today_read">今日阅读</span>

        <!-- 头像 -->
        <div class="avatar">
          <div class="avatar_box"><div class="avatar_img"></div></div>
          <span class="nickname">天涯明月刀</span>
        </div>

        <!-- 动态/粉丝/关注 -->
        <ul class="ul_blue uls">
          <li v-for="(item,index) in myAction" :key="index">
            <span>{{item.num}}</span>
            <span>{{item.text}}</span>
          </li>
        </ul>
      </div>

      <!-- 以下都为白色背景部分 -->
      <div class="ul_white_wrap">
        <ul class="ul_white uls">
          <li v-for="(item,index) in myAction2" :key="index" @click="enterPage(index)">
            <span :class="'iconfont '+item.icon"></span>
            <span>{{item.text}}</span>
          </li>
        </ul>
      </div>
      <div class="my_items">
        <ul class="item">
          <li v-for="(item,index) in myAction3" :key="index">
            <span>{{item.text}}</span>
            <span :class="'iconfont '+item.icon"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import Header from '@/components/Header.vue'

export default {
  data(){
    return {
      myAction: [
        {text:'动态',num:0},
        {text:'关注',num:1},
        {text:'粉丝',num:0}
      ],
      myAction2: [
        {text:'收藏',icon:'icon-xingxing1'},
        {text:'历史',icon:'icon-lishi'},
        {text:'作品',icon:'icon-zuopin'}
      ],
      myAction3: [
        {text:'消息通知',icon:'icon-youjiantou1'},
        {text:'用户反馈',icon:'icon-youjiantou1'},
        {text:'小智同学',icon:'icon-youjiantou1'}
      ]
    }
  },
  components: {
    // Header
  },
  mounted(){
    
  },
  methods:{
    enterPage(index){
      switch(index){
        case 0:
          console.log(111);
          this.$router.push("/collected");
        break;
        case 1:
        break;
      }
    }
  }
}
</script>

<style scoped lang="less">
/* 只限于一个文件里边使用:在其他less文件中需要样式的地方直接.fitbg('***.jpg'); */
.fitbg(@file,@width:100%,@percent:50%) {
  background-image:url('@{file}');
  width: @width;
  height: 0;
  padding-bottom: @percent; //  宽:高 = 1:2
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.uls{
  width: 80%;
  // left: 50%;
  // transform: translateX(-50%);
  // background: #b2b;//方便调试文字位置所用
  position: absolute;
  // bottom: 20px;
  display: flex;
  li{
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: space-between;//两端对齐(垂直方向)
    flex-direction: column;
    font-size: 14px;
    color: #fff;
  }
}



.content{
  margin-top: 0;
  .my_top{
    width: 100%;
    height: 180px;//控制蓝色块高度
    background: #449FFA;
    position: relative;
    .today_read{
      width: 22%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size:14px;
      color: #fff;
      background: #295F96;
      position: absolute;
      right: 0;
      top: 45px;//控制盒子位置
      border-radius: 30px 0 0 30px;
    }
    .avatar{
      display: flex;
      width: 60%;
      height: 60px;//图片与昵称的盒子高度,与图片一致:60px
      // background: #aaa;//用于调试定位图片和昵称的盒子
      position: absolute;
      top: 35px;//控制盒子位置
      left: 20px;
      .avatar_box{
        width: 60px;//此处控制图片宽度,下面的percent控制与宽度的比例高度
        .avatar_img{
          .fitbg('@/assets/images/1.jpg',@width:100%,@percent:100%);
          // height: 35px;//此处不要设置高度(用法如此)
          border-radius: 50%;
        }
      }
      .nickname{
        margin-top: 15px;
        margin-left: 10px;
        color: #fff;
        font-size: 14px;
      }
    }
    .ul_blue{
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
    }
  }
  .ul_white_wrap{
    width: 100%;
    height:80px;
    // background: #b2b;//方便调试专用
    position: relative;
    display: flex;
    justify-content: center;
    .ul_white{
      bottom: 50%;
      transform: translateY(50%);
      // background: #65f;//方便调试专用
      li{
        align-self: center;
        color: #1a1a1a;
        span:first-child{
          font-size: 20px;//图标
        }
        span:last-child{
          font-size: 14px;
        }
      }
    }
  }

  .my_items{
    .item{
      li{
        width:100%;
        height: 45px;
        // background: #b2b;//方便调试专用
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 3px solid #eee;
        &:first-child{
          border-top: 3px solid #eee;
        }
        &:last-child{
          // border-bottom: 1px solid #09f;
        }
        span:nth-child(1){
          margin-left: 20px;
          font-size: 14px;
        }
        span:nth-child(2){
          margin-right: 20px;
          font-size: 20px;//右箭头
        }
      }
    }
  }
}
</style>
