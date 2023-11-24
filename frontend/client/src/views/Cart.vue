<template>
  <div class="container mt-5">
    <h1>Giỏ hàng</h1>

    <div v-if="cart.products.length === 0">
      <p>Giỏ hàng rỗng.</p>
    </div>

    <div v-else>
      <div
        v-for="(item, index) in cart.products"
        :key="index"
        class="cart-item"
      >
        <div>
          <h3>{{ item.product.name }}</h3>
          <p>Số lượng: {{ item.quantity }}</p>
          <p>Giá: {{ item.product.price }}</p>
          <!-- Add more details based on your product model -->
        </div>
        <button @click="removeFromCart(item.product._id)">Gỡ</button>
      </div>

      <p>Tổng tiền: {{ calculateTotalPrice() }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import userService from "../services/user.service";
import productService from "../services/product.service";
export default {
  setup() {
    const cart = ref({ products: [] });

    const store = useStore();

    const loadCart = async () => {
      try {
        // Fetch the user's cart using the store's state
        const userId = store.getters.user._id;
        const data = await userService.cart(userId);
        // for (const item of data.products) {
        //   item.productInfo = await productService.get(item.product);
        // }
        cart.value = data;
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    const removeFromCart = async (productId) => {
      try {
        await userService.deleteCart(productId);
        // Refresh the cart after removing an item
        loadCart();
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    };

    const calculateTotalPrice = () => {
      return cart.value.products.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
    };

    // Load the cart when the component is mounted
    onMounted(() => {
      loadCart();
    });

    return {
      cart,
      removeFromCart,
      calculateTotalPrice,
    };
  },
};
</script>

<style scoped>
/* Add your styles for the cart component */
</style>
