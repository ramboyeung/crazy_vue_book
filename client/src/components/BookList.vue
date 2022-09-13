<template>
  <div class="bookList_container">
    <ul>
        <li v-for="item in books" :key="item.bookId">
            <div class="select_item" v-if="showCheckbox">
                <h4>
                    <input class="selected" type="checkbox" @click="selectMe" /><span>选择</span>
                </h4>
            </div>
            <div class="book_left">
                <router-link tag="img" :to="{name:'detail',params:{bid:item.bookId}}" :src="item.bookCover" :alt="item.bookName" />
            </div>
            <router-link tag="div" :to="{name:'detail',params:{bid:item.bookId}}" class="book_right">
                <h2 class="book_name">{{item.bookName}}</h2>
                <p>{{item.bookInfo}}</p> 
                <div class="tip_p">
                    <span class="price">{{item.bookPrice | toUnit}}</span>
                    <i class="iconfont icon-xingxing collect" @click.stop="cancelCollect(item.bookId)" v-if="item.collected"></i>
                    <i class="iconfont icon-shoucang collect" @click.stop="addCollect(item.bookId)" v-else></i>
                </div>
                <div class="btn_box" v-if="showBtn">
                    <button class="del_btn" @click.stop="delBook(item.bookId)">删除</button>
                    <button class="md_btn" @click.stop="modify(item.bookId)">修改</button>
                </div>
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    props:{
        showCheckbox: {
            type: Boolean,
            default: false
        },
        showBtn: {
            type: Boolean,
            default: false
        },
        books: {
            type: Array,
            default: ()=>[]
        },
    },
    filters:{
        toUnit(val){
            // console.log(val);
            return "￥" + Number(val).toFixed(2);
        }
    },
    methods:{
        selectMe(){
            
        },
        modify(id){
            this.$router.push({path: "/update",query: {id}});
        },
        delBook(id){
            this.$store.dispatch("delBookAction",id);
        },
        cancelCollect(id){
            console.log("发请求取消收藏id为"+id+"的书");
        },
        addCollect(id){
            console.log("发请求收藏id为"+id+"的书");
        }
    }
}
</script>

<style scoped lang="less">
.bookList_container{
    // background: #b2b;
    ul{
        background: #eee;
        padding: 10px 5%;
        li{
            display:flex;
            height: 130px;
            background: #ccc;
            margin-top: 10px;
            &:first-child{
                margin-top: 0;
            }
            .select_item{
                padding-top: 5px;
                flex: 0.7;
                // width: 30px;
                display: flex;
                align-items: center;
                h4{//加h4是为了控制位置
                    width: 100%;
                    .selected{
                        margin: 0 5px;
                    }
                    span{
                        font-size: 14px;
                    }
                }
            }
            .book_left{
                flex:1;
                img{
                    height: 100%;
                }
            }
            .book_right{
                flex:2;
                padding-left: 10px;
                .book_name{
                    display: block;
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-indent:5px;
                    font-size: 18px;
                    margin: 10px 0 5px;
                }
                p{
                    color: #666;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;//文字最多显示2行
					font-size:12px;
                }
                .tip_p{
                    display: flex;
                    align-items: center;
                    // margin-top: 5px;
                    .price{
                        font-size: 14px;
                        color: #e23a3a;
                    }
                    .collect{
                        margin-left: 10px;
                    }
                }
                .btn_box{
                    margin-left: 10px;
                    button{
                        width: 45px;
                        height:25px;
                        line-height:25px;
                        text-align: center;
                        outline: none;
                        border: none;
                        background: #09f;
                        border-radius: 5px;
                        color: #fff;
                        font-size: 12px;
                        &.del_btn{
                            background:#e23a3a;
                        }
                        &.md_btn{
                            margin-left:10px;
                        }
                    }
                }
            }
        }
    }
}
</style>