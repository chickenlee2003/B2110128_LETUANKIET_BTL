<template>
  <div class="container mt-5">
    <form @submit.prevent="login" class="col-md-6 offset-md-3">
      <h1 class="text-primary mb-4">Đăng Nhập</h1>
      <div class="card">
        <div class="card-body">
          <div class="mb-3">
            <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Tài khoản"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Mật khẩu"
            />
          </div>
          <button
            :disabled="loading"
            class="btn btn-primary btn-block"
            type="submit"
          >
            Đăng nhập
          </button>

          <div v-if="errorMessage" class="text-danger mt-3">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import authService from "../services/auth.service";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const errorMessage = ref("");
    const store = useStore();

    const login = async () => {
      try {
        const response = await authService.login({
          username: username.value,
          password: password.value,
        });
        // L
        store.dispatch("login", {
          token: response.token,
          user: response.user,
        });
        if (response.status === "ok") {
          router.push({ name: "Product" }); // Redirect to the 'Product' page on successful login
        } else {
          errorMessage.value = response.msg || "Đăng nhập thất bại.";
        }
      } catch (error) {
        console.log("Error login:", error);
        errorMessage.value = "Đã xảy ra lỗi khi đăng nhập.";
      }
    };

    return {
      login,
      username,
      password,
      errorMessage,
    };
  },
};
</script>

<style scoped>
/* Custom CSS styles go here */
</style>
