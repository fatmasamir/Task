import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Homepage from "@/views/Homepage/Main.vue";
import Products from "@/views/Products/Main.vue";
import ShowProduct from "@/views/Products/ShowProduct/index.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = `   الصفحه الرئيسيه
       - Crud`;
      } else {
        document.title = "Home page - Crud";
      }
    },
  },
  {
    path: "/products",
    name: "products",
    component: Products,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = ` المنتجات  
         - Crud`;
      } else {
        document.title = "products page - Crud";
      }
    },
  },
  {
    path: "/show-product/:id",
    name: "ShowProduct",
    component: ShowProduct,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = ` عرض المنتج  
         - Crud`;
      } else {
        document.title = "show product page - Crud";
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { left: 0, top: 0 };
    }
  },
});

export default router;
