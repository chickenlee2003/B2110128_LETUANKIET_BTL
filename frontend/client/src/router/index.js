import { createWebHistory, createRouter } from "vue-router";
import { requireAuth } from "../router-guards";
const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "Home",
    },
    name: "Home",
  },
  {
    path: "/product",
    component: () => import("../views/Product.vue"),
    meta: {
      title: "Sản phẩm",
    },
    name: "Product",
  },
  {
    path: "/product/Cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      title: "Sản phẩm",
    },
    name: "Cart",
    beforeEnter: requireAuth,
  },
  {
    path: "/user",
    component: () => import("../views/User.vue"),
    meta: {
      title: "Thông tin",
    },
    name: "User",
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Đăng nhập",
    },
    name: "Login",
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
    meta: {
      title: "Đăng ký",
    },
    name: "Register",
  },
  {
    path: "/product/Casio",
    component: () => import("../views/productCasio.vue"),
    meta: {
      title: "Sản phẩm Casio",
    },
    name: "Casio",
  },
  {
    path: "/product/Citizen",
    component: () => import("../views/productCitizen.vue"),
    meta: {
      title: "Sản phẩm Citizen",
    },
    name: "Citizen",
  },
  {
    path: "/product/Olym",
    component: () => import("../views/productOlym.vue"),
    meta: {
      title: "Sản phẩm Olym",
    },
    name: "Olym",
  },
  {
    path: "/detailProduct/:id",
    component: () => import("../views/detailProduct.vue"),
    meta: {
      title: "Chi tiết sản phẩm",
    },
    name: "detailProduct",
  },
  {
    path: "/product/detailProduct/:id",
    component: () => import("../views/detailProduct.vue"),
    meta: {
      title: "Chi tiết sản phẩm.",
    },
    name: "detailProduct_",
  },
  // {
  //   path: "/product",
  //   // component: () => import("../views/Product.vue"),
  //   meta: {
  //     title: "Trang chủ quản lí sản phẩm",
  //   },
  //   name: "Product",

  //     {
  //       path: "ProductList",
  //       component: () => import("../views/ProductList.vue"),
  //       meta: {
  //         title: "Danh sách sản phẩm",
  //       },
  //       name: "ProductList",
  //     },
  //     {
  //       path: "/product/updateProduct/:id",
  //       component: () => import("../views/updateProduct.vue"),
  //       meta: {
  //         title: "Cập nhật sản phẩm",
  //       },
  //       name: "UpdateProduct",
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Watches`;
  next();
});

export default router;
