<template>
  <div class="bookItem" :style="{width:wid}">
    <router-link tag="ul" :to="{name:'detail',params:{bid:bookItem.bookId}}">
        <div class="img_box"><img :src="bookItem.bookCover" :alt="bookItem.bookName"></div>
        <li>
           <h3>{{bookItem.bookName}}</h3>
           <p>{{bookItem.bookInfo}}</p>
           <span>{{bookItem.bookPrice | toUnit}}</span>
           <slot></slot>
        </li>  
    </router-link>
  </div>
</template>

<script>
export default {
    props: {
        bookItem: {
            type: Object,
            default: ()=>{}
        },
        wid:{// 注意传值时不要超过96%，否则会影响上下的公共部分
            type:String,
            default: "45%"
        }
    },
    filters:{
        toUnit(val){
            // console.log(val);
            return "￥" + Number(val).toFixed(2);
        }
    }
}
</script>

<style scoped lang="less">
.bookItem{
    // width: 45%;//已动态处理
    margin-left: 3.333%;
    margin-top: 10px;
    overflow: hidden;
    background: #fff;
    cursor:pointer;
    ul{
        display: flex;
        height: 120px;
        .img_box{
            height: 120px;
            flex:4;
            position: relative;
            img{
                height: 80%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
            }
        }
        li{
            flex:5;
            display: flex;
            flex-direction: column;
            h3{
                font-size: 16px;
                color: #666;
                font-weight: bold;
                margin: 5px 0;
            }
            p{
                font-size: 12px;
                color: #a7a7a7;
                margin-bottom: 5px;
            }
            span{
                font-size: 14px;
                color: #e23a3a;
            }
        }
    }
}
</style>
