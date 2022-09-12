import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/home',
    alias: '/index',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta:{
      showTabBar: true,//控制页面底部是否显示tabBar,不写此属性说明不需要
      requiresAuth: false, // false表示不需要登录
      title: "首页"
    }
  },
  {
    path: '/list',
    component: () => import('../views/List.vue'),
    meta:{
      showTabBar: true,
      requiresAuth: false,
      title: "书单列表"
    }
  },
  {
    path: '/update',
    component: () => import('../views/Update.vue'),
    meta:{
      requiresAuth: true,
      title: "更改图书"
    }
  },
  {
    path: '/add',
    component: () => import('../views/Add.vue'),
    meta:{
      requiresAuth: true,
      title: "新增书单"
}  },
  {
    path: '/detail/:bid',//需要在路由后面显示参数就配上，不需要显示就不需要配
    name: "detail",//起名是为了params传参
    component: () => import('../views/Detail.vue'),
    meta:{
      requiresAuth: false,
      title: "书籍详情"
    }
  },
  {
    path: '/my',
    component: () => import('../views/My.vue'),
    meta:{
      showTabBar: true,
      requiresAuth: true, // true表示需要登录
      title: "我的"
    }
  },
  {
    path: '/collected',
    component: () => import('../views/Collected.vue'),
    meta:{
      requiresAuth: true, // true表示需要登录
      title: "我的收藏书单"
    }
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    meta:{
      requiresAuth: false,
      title: "登录 | 注册"
    }
  },
  {
    path: '*',
    component: () => import('../views/404.vue'),
    meta:{
      requiresAuth: false,
      title: "404，找不到"  
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if (to.meta.title) {
    //判断是否有标题
    document.title = to.meta.title;
  }
  // console.log("title",document.title)
  // 通过requiresAuth判断当前路由导航是否需要登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = Number(localStorage.getItem('token'));
    // console.log("token",token)
    // 若需要登录访问，检查是否为登录状态
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});
export default router
