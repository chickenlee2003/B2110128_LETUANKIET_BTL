<template>
  <div class="container mt-5">
    <form @submit.prevent="register" class="col-md-6 offset-md-3">
      <h1 class="text-primary mb-4">Đăng Ký</h1>
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
          <div class="mb-3">
            <input
              v-model="email"
              type="text"
              class="form-control"
              placeholder="Email"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="address"
              type="text"
              class="form-control"
              placeholder="Địa chỉ"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="phone"
              type="text"
              class="form-control"
              placeholder="Số điện thoại"
            />
          </div>
          <button
            :disabled="loading"
            class="btn btn-primary btn-block"
            type="submit"
          >
            Đăng ký
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

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const email = ref("");
    const address = ref("");
    const phone = ref("");
    const errorMessage = ref("");
    const router = useRouter();
    const cart = "";
    console.log({ username, password });
    const register = async () => {
      try {
        const response = await authService.register({
          username: username.value,
          password: password.value,
          email: email.value,
          address: address.value,
          phone: phone.value,
          cart: "", // Add an empty cart
        });
        // console.log("test", response);
        alert("Đăng ký thành công!");
        if (response.status === "ok") {
          router.push({ name: "Login" });
        } else {
          errorMessage.value = response.msg || "Đăng ký thất bại.";
        }
      } catch (error) {
        console.log("Error register:", error);
        errorMessage.value = "Đã xảy ra lỗi khi đăng ký.";
      }
    };

    return {
      register,
      username,
      password,
      email,
      address,
      phone,
      errorMessage,
    };
  },
};
</script>

<style scoped>
/* Custom CSS styles go here */
</style>
