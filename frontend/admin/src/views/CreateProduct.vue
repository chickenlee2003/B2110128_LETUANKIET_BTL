<template>
  <div class="create-product">
    <h1>Create a New Product</h1>
    <form @submit.prevent="create">
      <label for="name">Tên:</label>
      <input v-model="name" type="text" required />

      <label for="description">Mô tả:</label>
      <textarea v-model="description" required></textarea>

      <label for="price">Giá:</label>
      <input v-model.number="price" type="number" required />

      <label for="stock">Số lượng:</label>
      <input v-model.number="stock" type="number" required />

      <label for="note">Thương hiệu:</label>
      <textarea v-model="note"></textarea>

      <label for="images">Hình ảnh:</label>
      <input v-model="images" type="text" />

      <button type="submit">Thêm sản phẩmt</button>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import productService from "../services/product.service";

export default {
  setup() {
    const name = ref("");
    const description = ref("");
    const price = ref(0);
    const stock = ref(0);
    const note = ref("");
    const images = ref("");
    const successMessage = ref("");
    const errorMessage = ref("");

    const create = async () => {
      try {
        const createdProduct = await productService.create({
          name: name.value,
          description: description.value,
          price: price.value,
          stock: stock.value,
          note: note.value,
          images: images.value,
        });

        // Handle success
        successMessage.value = "Product created successfully!";
        errorMessage.value = "";

        console.log("Product created:", createdProduct);
      } catch (error) {
        // Handle error
        successMessage.value = ""; // Clear any previous success messages
        errorMessage.value = "Error creating product: " + error.message;
        console.error("Error creating product:", error);
      }
    };

    return {
      name,
      description,
      price,
      stock,
      note,
      images,
      create,
      successMessage,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.create-product {
  max-width: 600px;
  margin: auto;
}

form {
  display: grid;
  gap: 10px;
}

label {
  font-weight: bold;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
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
