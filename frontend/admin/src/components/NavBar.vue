<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-info">
      <router-link to="/product/ProductHome" class="navbar-brand">
        <img
          style="width: 100px"
          src="../assets/WLogo-removebg-preview.png"
          alt="logo"
      /></router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#nav-collapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="nav-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
            >
              <i style="color: aliceblue">Quản lí sản phẩm</i>
            </a>
            <div class="dropdown-menu">
              <router-link to="/product/CreateProduct" class="dropdown-item"
                >Thêm sản phẩm</router-link
              >
              <router-link to="/product/ProductList" class="dropdown-item"
                >Cập nhật sản phẩm</router-link
              >
              <!-- <router-link to="/product/UpdateProduct" class="dropdown-item"
                >Cập nhật sản phẩm</router-link
              > -->
            </div>
          </li>
          <router-link
            to=" "
            class="nav-item navbar-brand"
            style="color: aliceblue; margin: 5px"
            >Quản lí đơn đặt hàng</router-link
          >
        </ul>

        <!-- Right aligned nav items -->
        <!-- <div class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Tìm kiếm"
            aria-label="Search"
            v-model="name"
          />
          {{}}
          <button class="btn btn-secondary" @click="search">Tìm</button>
        </div> -->

        <div class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownLang"
            role="button"
            data-toggle="dropdown"
            style="color: aliceblue"
          >
            Ngôn ngữ
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">EN</a>
            <a class="dropdown-item" href="#">ES</a>
            <a class="dropdown-item" href="#">RU</a>
            <a class="dropdown-item" href="#">FA</a>
          </div>
        </div>

        <div class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownUser"
            role="button"
            data-toggle="dropdown"
            style="color: aliceblue"
          >
            <em>Tài khoản</em>
          </a>
          <div class="dropdown-menu">
            <!-- <a class="dropdown-item" href="#">Hồ sơ</a> -->
            <router-link to="/login" class="dropdown-item"
              >Đăng nhập</router-link
            >
            <!-- <a class="dropdown-item"> -->
            <router-link to="/login" class="dropdown-item" @click="logout"
              >Đăng xuất</router-link
            >
            <!-- </a> -->
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
if (typeof window.global === "undefined") {
  window.global = window;
}
import jQuery from "jquery";
global.jQuery = jQuery;
global.$ = jQuery;
import "bootstrap";
import productService from "../services/product.service";
import { onBeforeMount, ref } from "vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const Product = ref();
    const name = ref();
    const store = useStore();
    const router = useRouter();

    onBeforeMount(async () => {
      try {
        Product.value = await productService.getAll();
      } catch (error) {
        console.log(error);
      }
    });

    const search = async () => {
      console.log("search called");
      if (name.value) {
        Product.value = await productService.getbyname(name.value);

        console.log("search name");
      } else {
        Product.value = await productService.getAll();
        console.log("search all");
      }
    };
    const logout = () => {
      // Dispatch the 'logout' action to log the user out
      store.dispatch("logout");
      router.push({ name: "Login" }); // Redirect to the 'Login' page on successful login
    };

    return { search, name, Product, logout };
  },
};
</script>
