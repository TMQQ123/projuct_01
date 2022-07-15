import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";

const AppHome = () => import("@/views/Home");
const Detail = () => import("@/views/detail/index");
const Search = () => import("@/views/search/index");
const Login = () => import("@/views/login/index");
const Infouser = () => import("@/views/login/infouser");

const routes = [
  {
    path: "/",
    name: "APPHome",
    component: AppHome,
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/infoUser",
    name: "Infouser",
    beforeEnter: (to, from, next) => {
      if (
        store.state.isLogin ||
        store.state.token ||
        localStorage.getItem("token")
      ) {
        next();
      } else {
        next("/login");
      }
    },
    component: Infouser,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, form) => {
  if (to.path === "/login") {
    store.state.isFooterMusic = false;
  } else {
    store.state.isFooterMusic = true;
  }
});
export default router;
