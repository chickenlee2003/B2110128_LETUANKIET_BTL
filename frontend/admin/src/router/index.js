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
    beforeEnter: requireAuth,
  },
  {
    path: "/user",
    component: () => import("../views/User.vue"),
    meta: {
      title: "Quản lí người dùng",
    },
    name: "User",
    beforeEnter: requireAuth,
  },
  {
    path: "/product",
    // component: () => import("../views/Product.vue"),
    meta: {
      title: "Trang chủ quản lí sản phẩm",
    },
    name: "Product",
    children: [
      {
        path: "CreateProduct",
        component: () => import("../views/CreateProduct.vue"),
        meta: {
          title: "Thêm sản phẩm",
        },
        name: "CreateProduct",
        beforeEnter: requireAuth,
      },
      {
        path: "ProductList",
        component: () => import("../views/ProductList.vue"),
        meta: {
          title: "Danh sách sản phẩm",
        },
        name: "ProductList",
        beforeEnter: requireAuth,
      },
      {
        path: "/product/updateProduct/:id",
        component: () => import("../views/updateProduct.vue"),
        meta: {
          title: "Cập nhật sản phẩm",
        },
        name: "UpdateProduct",
        beforeEnter: requireAuth,
      },
      {
        path: "ProductHome",
        component: () => import("../views/ProductHome.vue"),
        meta: {
          title: "Thêm sản phẩm",
        },
        name: "ProductHome",
        beforeEnter: requireAuth,
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Đăng nhập",
    },
    name: "Login",
  },
  // {
  //   path: "/Order",
  //   component: () => import("../views/Order.vue"),
  //   meta: {
  //     title: "Đăng nhập",
  //   },
  //   name: "Order",
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Watches`; // Thay đổi tiêu đề của trang dựa trên meta title
  next();
});

export default router;
