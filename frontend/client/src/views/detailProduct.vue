<template>
  <div class="product-detail">
    <h1>Chi tiết sản phẩm</h1>
    <form @submit.prevent="buyProduct">
      <div class="grid-container">
        <div>
          <label for="name">Tên:</label>
          <span>{{ name }}</span>
        </div>

        <div>
          <label for="description">Mô tả:</label>
          <p>{{ description }}</p>
        </div>

        <div>
          <label for="price">Giá:</label>
          <span>{{ price }}</span>
        </div>

        <div>
          <label for="stock">Số lượng:</label>
          <span>{{ stock }}</span>
        </div>

        <div>
          <label for="note">Thương hiệu:</label>
          <p>{{ note }}</p>
        </div>

        <div>
          <label for="images">Hình ảnh:</label>
          <img
            :src="images"
            alt="Product Image"
            style="max-width: 100%; height: auto"
          />
        </div>

        <div class="buy-section">
          <label for="quantity">Số lượng:</label>
          <input v-model.number="quantity" type="number" min="1" :max="stock" />
          <button type="submit" class="btn btn-success">Mua hàng</button>
          <button
            class="btn btn-success btn-lg"
            @click="addToCart(item)"
            style="margin-left: 20px"
          >
            Thêm
          </button>
        </div>
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import productService from "../services/product.service";
import { useRoute } from "vue-router";

export default {
  setup() {
    const name = ref();
    const description = ref();
    const price = ref();
    const stock = ref();
    const note = ref();
    const images = ref();
    const quantity = ref(1); // Default quantity to 1
    const successMessage = ref();
    const errorMessage = ref();
    const route = useRoute();
    const id = route.params.id;

    onBeforeMount(async () => {
      try {
        const res = await productService.get(id);
        name.value = res.name;
        description.value = res.description;
        price.value = res.price;
        stock.value = res.stock;
        note.value = res.note;
        images.value = res.images;
      } catch (error) {
        console.log(error);
      }
    });

    const buyProduct = () => {
      if (quantity.value <= 0) {
        errorMessage.value = "Số lượng phải lớn hơn 0.";
      } else if (quantity.value > stock.value) {
        errorMessage.value = "Số lượng không được lớn hơn số lượng trong kho.";
      } else {
        // Implement the logic to handle the purchase
        // You can use the 'quantity' and 'id' values for processing the purchase
        // For example, make an API call to process the purchase
        console.log("mua " + quantity.value + ` sản phẩm có id: ${id}`);

        // Reset error and success messages
        errorMessage.value = "";
        successMessage.value = "Mua hàng thành công!";
      }
    };

    return {
      name,
      description,
      price,
      stock,
      note,
      images,
      quantity,
      buyProduct,
      route,
      errorMessage,
      successMessage,
    };
  },
};
</script>

<style scoped>
.product-detail {
  max-width: 800px;
  margin: auto;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

span {
  display: inline-block;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
}

img {
  max-width: 100%;
  height: auto;
}

.buy-section {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
}

.btn {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}

.success-message {
  color: #4caf50;
  margin-top: 10px;
}

.error-message {
  color: #f44336;
  margin-top: 10px;
}
</style>
