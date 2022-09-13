import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api";//注意此处必须这样引入，因为在vue实例上获取不到this.$api

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books:[]
  },
  getters: {
    // books: state => state.books,
    hotBooks: state => state.books.filter(item => item.isHot),
    collectedBooks: state => state.books.filter(item => item.collected),
  },
  mutations: {//必须同步，不能写异步代码----> vuex唯一改变数据的方式
    getBooks(state,payload){
      state.books = payload
    },
    addBook(state,payload){
      state.books = [...state.books,payload]
    },
    delBook(state,id){
      let db = JSON.parse(JSON.stringify(state.books));//把books拷贝一份
      state.books = db.filter(item=>item.id!==id);
    },
    updateBook(state,id,p2){
      let db = JSON.parse(JSON.stringify(state.books));//把books拷贝一份
      let obj = db.find(item=>item.id==id);
      let ind = db.findIndex(item=>item.id==id);//找到了就返回索引，未找到就返回-1
      db[ind] = {...obj,...p2};
      state.books = db;
    }
  },
  actions: {//可同步，也可异步，注意actions里commit提交载荷的两种写法
    async getBooksAction(context){//只获取，不修改，所以不需要第二个载荷参数
      //console.log(this);//this--->store，所以不能在这里边使用vue的实例
      let arg = await api.getBooks();
      context.commit("getBooks",arg);
    },
    
    // async addBookAction(context,arg){
    //   console.log(arg);//undefined
    //   await api.addBook(arg);
    //   context.commit("addBook",arg);
    // },
    async addBookAction({commit},arg){
      /*
      context用法解说：
      context:{
        state,   等同于store.$state，若在模块中则为局部状态
        rootState,   等同于store.$state,只存在模块中
        commit,   等同于store.$commit
        dispatch,   等同于store.$dispatch
        getters   等同于store.$getters
      }
      */
      //console.log(arg);//注意传参的错误写法{commit,arg}会导致载荷arg为undefined
      await api.addBook(arg);
      commit("addBook",arg);
    },
    async delBookAction(context,payload){//只获取，不修改，所以不需要第二个载荷参数
      //console.log(this);//this--->store，所以不能在这里边使用vue的实例
      await api.deleteBook(payload);//后端先删
      context.commit("delBook",payload);//然后前端再删
    },
    async updateBookAction(context,id,p2){//修改
      await api.updateBook(id,p2);
      context.commit("updateBook",id,p2);
    },
  },
  // modules: { //没有放在mudules里的东西都是全局的，一旦放入就分块打包了--->主要解决数据臃肿，不好管理和维护的问题
  //   moduleA:{
  //     state:{},getters:{},mutations:{},actions:{}
  //   },
  //   moduleB:{
  //     state:{},getters:{},mutations:{},actions:{}
  //   }
  // }
})
