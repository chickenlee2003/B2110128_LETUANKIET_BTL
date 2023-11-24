<template>
  <div class="update-product">
    <h1>Cập nhật sản phẩm</h1>
    <form @submit.prevent="update">
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

      <button type="submit">Cập nhật sản phẩm</button>

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
    const name = ref("");
    const description = ref("");
    const price = ref(0);
    const stock = ref(0);
    const note = ref("");
    const images = ref("");
    const successMessage = ref("");
    const errorMessage = ref("");
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

    const update = async () => {
      try {
        await productService.updateProduct(id, {
          name: name.value,
          description: description.value,
          price: price.value,
          stock: stock.value,
          note: note.value,
          images: images.value,
        });
        successMessage.value = "Product updated successfully!";
        errorMessage.value = "";
      } catch (error) {
        successMessage.value = "";
        errorMessage.value = "Error updating product: " + error.message;
        console.error("Error updating product:", error);
      }
    };

    return {
      name,
      description,
      price,
      stock,
      note,
      images,
      update,
      successMessage,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.update-product {
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
