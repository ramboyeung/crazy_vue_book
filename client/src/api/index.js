import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.timeout = 15000;
axios.defaults.withCredentials = true;//允许携带cookie

// http 请求拦截器
axios.interceptors.request.use(
/*
    // config=>{
    //   if(localStorage.getItem('Authorization')){
    //   config.headers.Authorization = localStorage.getItem('Authorization');
    //   }
    //   return config;
    // }
    config => {
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `token ${store.state.token}`;
      }
      return config;
    },
    err => Promise.reject(err)
*/
);


// http 响应拦截器
axios.interceptors.response.use(res=>{
    return res.data;
},
error => {
/*
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        // localStorage.removeItem('Authorization');
        // this.$router.push('/login');

        store.commit(types.LOGOUT);
        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })
    }
  }
  return Promise.reject(error.response.data)  // 返回接口返回的错误信息
*/
});

const getSliders = () => {//获取轮播图
    return axios.get("/sliders");
}
// const getHot = () => {//获取热门图书
//     return axios.get("/hot");
// }
const getBooks = () => {//获取所有的图书列表（自己可筛）
    return axios.get("/books");
}
const addBook = (data) => {//添加新的图书
    return axios.post("/books",data);
}
const updateBook = (id,data) => {//更改新的图书，或者收藏、取消收藏
    return axios.put(`/books/?id=${id}`,data);
}
const deleteBook = (id) => {//删除图书
    return axios.delete(`/books/?id=${id}`);
}
const findOneBook = (id) => {//获取某一本书
  return axios.get(`/books/?id=${id}`);
}
const checkLogin = (user) => {//登录验证
    return axios.post("/login",user);
}

export default {
    getSliders,
    // getHot,
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    findOneBook,
    checkLogin
}
