<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-info">
      <router-link to="/product" class="navbar-brand">
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
          <li class="nav-item">
            <router-link to="/product/Casio" class="navbar-brand"
              >Casio</router-link
            >
            <router-link to="/product/Citizen" class="navbar-brand"
              >Citizen</router-link
            >
            <router-link to="/product/Olym" class="navbar-brand"
              >Olym Pianus</router-link
            >
          </li>
        </ul>
        <div>
          <div class="">
            <router-link
              to="/product/Cart"
              id="navbarDropdownLang"
              role="button"
              style="padding: 30px; color: aliceblue"
              >Giỏ hàng</router-link
            >
          </div>
        </div>
        <!-- <div class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="name"
          />
          {{}}
          <button class="btn btn-secondary" @click="search">Search</button>
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
            <router-link to="/user" class="dropdown-item">Hồ sơ</router-link>
            <router-link to="/login" class="dropdown-item"
              >Đăng nhập</router-link
            >
            <router-link to="/register" class="dropdown-item"
              >Đăng ký</router-link
            >
            <a class="dropdown-item" href="#">Đăng xuất</a>
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

export default {
  setup() {
    const Product = ref();
    const name = ref();

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
    return { search, name, Product };
  },
};
</script>
