<template>
  <div>
    <h1>Cập nhật sản phẩm</h1>
    <div class="form-inline my-2 my-lg-0">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        v-model="name"
      />
      <button class="btn btn-secondary" @click="search">Search</button>
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
        <div class="d-grid gap-2 flex">
          <div class="right">
            <!-- <router-link :to="`deleteProduct/${item._id}`"> -->
            <button
              class="btn btn-info btn-lg nutxoa"
              style="color: red"
              @click="deleteProduct(item._id)"
            >
              Xoá
            </button>
            <!-- </router-link> -->
          </div>
          <div class="right">
            <router-link :to="`updateProduct/${item._id}`">
              <button class="btn btn-info btn-lg nutxoa">Sửa</button>
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import productService from "../services/product.service";
// import router from "../router";
export default {
  setup() {
    const products = ref();
    const name = ref();

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

    const deleteProduct = async (id) => {
      if (confirm("xac nhan xoa")) {
        try {
          await productService.delete(id);
        } catch (error) {
          console.log(error);
        }
        this.$router.go();
      }
    };

    return {
      products,
      search,
      name,
      deleteProduct,
    };
  },
};
</script>

<style>
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
