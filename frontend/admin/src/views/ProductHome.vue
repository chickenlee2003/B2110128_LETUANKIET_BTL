<template>
  <div v-if="isAuthenticated">
    <div class="container mt-5">
      <h1 style="">Danh sách sản phẩm</h1>
      <div class="form-inline my-2 my-lg-0" style="padding: 10px">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Tìm kiếm"
          aria-label="Search"
          v-model="name"
        />
        <button class="btn btn-secondary" @click="search">Tìm</button>
      </div>

      <ul class="list-group">
        <li v-for="(item, i) in products" :key="i" class="product-item row">
          <div class="product-image">
            <img :src="item.images" class="img" />
          </div>
          <div class="product-details">
            <p class="product-name">{{ item.name }}</p>
            <p class="product-stock">Stock: {{ item.stock }}</p>
            <p class="product-price">Price: {{ item.price }}</p>
            <p class="product-note">Note: {{ item.note }}</p>
            <p class="product-description placeholder-shown:first-line:">
              Description: {{ item.description }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <p>Vui lòng đăng nhập</p>
  </div>
</template>
<script>
import { ref, onBeforeMount, computed } from "vue";
// import { ref, onBeforeMount } from "vue";
import productService from "../services/product.service";
// import router from "../router";
import { useStore } from "vuex";
export default {
  setup() {
    const products = ref();
    const name = ref();

    const store = useStore();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    onBeforeMount(async () => {
      products.value = await productService.getAll();
    });

    const search = async () => {
      if (name.value) {
        products.value = await productService.getbyname(name.value);
      } else {
        products.value = await productService.getAll();
      }
    };

    return {
      products,
      search,
      name,
      isAuthenticated,
    };
  },
};
</script>

<style scoped>
.product-item {
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
}

.product-image {
  margin-right: 20px;
}

.img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.product-details {
  flex-grow: 1;
}

.product-name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-stock,
.product-price,
.product-note,
.product-description {
  margin: 5px 0;
}
.nutxoa {
  margin: 20px;
}
</style>
