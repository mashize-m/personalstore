import Vue from "vue";
import VueRouter from "vue-router";

// 懒加载
const Home = () => import("views/home/Home.vue");
const Category = () => import("views/category/Category.vue");
const Profile = () => import("views/profile/Profile.vue");
const Shopcart = () => import("views/shopcart/Shopcart.vue");
const Detail = () => import("views/detail/Detail.vue");

// 1. 安装插件
Vue.use(VueRouter);

// 2. 创建实例
const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/shopcart",
    component: Shopcart
  },
  {
    path: "/detail/:iid",
    component: Detail
  }
];
const router = new VueRouter({
  routes,
  mode: "history"
});

// 3. 导出router
export default router;
