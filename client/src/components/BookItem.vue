<template>
  <div class="bookItem_container">
    <ul>
        <li v-for="item in books" :key="item.bookId">
            <router-link tag="div" class="itm_box" :to="{name:'detail',params:{bid:item.bookId}}">
                <img :src="item.bookCover" :alt="item.bookName" />
                <b class="book_name">{{item.bookName}}</b> 
                <span class="price">{{item.bookPrice | toUnit}}</span>  
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    props: {
        books:{
            type:Array,
            default: ()=>[]
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
.bookItem_container{
    background: #eee;
    ul{
        width: 90%;// 剩下15%
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        background: #eee;
        padding-top: 5%;
        li{
            width: 30%;
            margin-bottom: 5%;
            &:nth-child(1n){//偶数项设边距
                margin-right: 5%;
            }
            &:nth-child(3n){//偶数项设边距
                margin-right: 0;
            }
            background: #4ee23a;
            .itm_box{
                padding: 10px;
                box-sizing: border-box;
                // background: #b2b;
                img{
                    width:100%;
                    margin-bottom: 5px;
                }
                .book_name{
                    display: block;
                    width: 100%;
                    height: 28px;
                    line-height: 28px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-indent:5px;
					font-size: 12px;
                }
                .price{
                    font-size: 14px;
                    color: #e23a3a;
                }
            }
        }
    }
}
</style>
