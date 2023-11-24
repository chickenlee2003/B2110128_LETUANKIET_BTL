<template>
  <div>
    <div class="quangcao">
      <div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="../assets/quangcao0.webp"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="../assets/quangcao1.webp"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="../assets/quangcao2.webp"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="head-list">
      <div>
        <h3 style="text-shadow: 2px 2px 5px lightskyblue">
          BỘ SƯU TẬP HÀNG LUXURY
        </h3>
      </div>
      <div class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Tìm kiếm"
          aria-label="Search"
          v-model="name"
        />
        <button
          class="btn btn-secondary"
          style="color: #ffc107"
          @click="search"
        >
          Tìm
        </button>
      </div>
    </div>

    <div class="product-grid">
      <div v-for="(item, i) in displayedProducts" :key="i" class="product-item">
        <!-- Your existing product item content here -->
        <div class="product-image">
          <img :src="item.images" class="img" />
        </div>
        <div class="product-details">
          <p class="product-name">{{ item.name }}</p>
          <p class="product-stock">Số lượng: {{ item.stock }}</p>
          <p class="product-price">Giá: {{ item.price }}</p>
          <p class="product-note">Thương hiệu: {{ item.note }}</p>
          <p class="product-description placeholder-shown:first-line:">
            Mô tả: {{ item.description }}
          </p>
          <div class="right">
            <router-link :to="`detailProduct/${item._id}`">
              <button class="btn btn-info btn-lg nutxoa">Mua</button>
            </router-link>
            <router-link :to="`detailProduct/${item._id}`">
              <button
                class="btn btn-success btn-lg"
                @click="addToCart(item)"
                style="margin-left: 20px"
              >
                Thêm
              </button>
            </router-link>
          </div>
        </div>
      </div>
      <button
        class="btn btn-secondary mt-3"
        @click="loadMore"
        v-if="displayedProducts.length < products.length"
      >
        xem thêm
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import productService from "../services/product.service";

export default {
  setup() {
    const products = ref([]);
    const displayedProducts = ref([]);
    const name = ref();
    const itemsPerPage = 6; // Adjust the number of items per page as needed
    let currentPage = 1;

    onBeforeMount(async () => {
      products.value = await productService.getAll();
      updateDisplayedProducts();
    });

    const updateDisplayedProducts = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      displayedProducts.value = products.value.slice(startIndex, endIndex);
    };

    const loadMore = () => {
      currentPage++;
      updateDisplayedProducts();
    };

    const search = async () => {
      currentPage = 1; // Reset page when searching
      if (name.value) {
        products.value = await productService.getbyname(name.value);
      } else {
        products.value = await productService.getAll();
      }
      updateDisplayedProducts();
    };

    return {
      products,
      displayedProducts,
      search,
      loadMore,
      name,
    };
  },
};
</script>

<style>
.product-grid {
  display: flex;
  flex-wrap: wrap;
}

.product-item {
  flex: 0 0 calc(33.333% - 20px);
  margin: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
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
.head-list {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: 10px;
}
.btn-secondary:hover {
  background-color: #ffd428;
  color: #212529;
  border-color: #ffd428;
}
.head-list h3 {
  font-weight: 600;
  color: #ffc107;
}
</style>
