<template>
  <div>
    <div class="head-list">
      <div>
        <!-- <h3>Casio</h3> -->
        <img src="../assets/Citizen_logo.svg.png" style="width: 180px" />
      </div>
      <div class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Tìm kiếm"
          aria-label="Search"
          v-model="name"
        />
        <button class="btn btn-secondary" @click="search">Tìm</button>
      </div>
    </div>

    <div class="row">
      <div
        v-for="(item, i) in products"
        :key="i"
        class="col-lg-4 col-md-6 col-sm-12"
      >
        <div class="product-item">
          <div class="product-image">
            <img :src="item.images" class="img" />
          </div>
          <div class="product-details">
            <p class="product-name">{{ item.name }}</p>
            <p class="product-stock">Số lượng: {{ item.stock }}</p>
            <p class="product-price">GIá: {{ item.price }}</p>
            <p class="product-note">Thương hiệu: {{ item.note }}</p>
            <p class="product-description">
              <strong>Mô tả:</strong> {{ item.description }}
            </p>
            <div class="right">
              <router-link :to="`detailProduct/${item._id}`">
                <button class="btn btn-info btn-lg nutxoa">Mua</button>
              </router-link>
              <button
                class="btn btn-success btn-lg"
                @click="addToCart(item)"
                style="margin-left: 20px"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import productService from "../services/product.service";
import router from "../router";

export default {
  setup() {
    const products = ref([]);
    const name = ref("");

    onBeforeMount(async () => {
      products.value = await productService.getbytype("Citizen");
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

<!-- <style>
  .product-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 10px;
  }
  
  .product-image {
    margin-bottom: 10px;
  }
  
  .img {
    width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .product-details {
    text-align: center;
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
  
  /* .btn-secondary {
    background-color: #ffc107;
    color: #212529;
    border-color: #ffc107;
  } */
  
  .btn-secondary:hover {
    background-color: #ffd428;
    color: #212529;
    border-color: #ffd428;
  }
  </style> -->
