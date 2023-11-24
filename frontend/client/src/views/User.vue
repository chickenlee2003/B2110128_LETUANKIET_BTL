<template>
  <div class="user-profile" v-if="user">
    <h1>Thông tin người dùng</h1>
    <div class="grid-container">
      <div>
        <label for="username">Tên người dùng:</label>
        <span>{{ user.username }}</span>
      </div>

      <div>
        <label for="email">Email:</label>
        <span>{{ user.email }}</span>
      </div>

      <div>
        <label for="address">Địa chỉ:</label>
        <span>{{ user.address }}</span>
      </div>

      <div>
        <label for="phone">Số điện thoại:</label>
        <span>{{ user.phone }}</span>
      </div>

      <div>
        <button @click="editProfile" class="edit-button">Chỉnh sửa</button>
      </div>
    </div>

    <!-- Edit form -->
    <form v-if="editing" @submit.prevent="saveChanges">
      <div>
        <label for="edit-username">Tên người dùng:</label>
        <input v-model="editedUser.username" id="edit-username" required />
      </div>

      <div>
        <label for="edit-email">Email:</label>
        <input v-model="editedUser.email" id="edit-email" required />
      </div>

      <div>
        <label for="edit-address">Địa chỉ:</label>
        <input v-model="editedUser.address" id="edit-address" />
      </div>

      <div>
        <label for="edit-phone">Số điện thoại:</label>
        <input v-model="editedUser.phone" id="edit-phone" />
      </div>

      <div>
        <button type="submit">Lưu thay đổi</button>
        <button @click="cancelEdit" type="button">Hủy</button>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const user = ref(null);
    const editing = ref(false);
    const editedUser = ref({
      username: "",
      email: "",
      address: "",
      phone: "",
    });

    onBeforeMount(async () => {
      // Fetch user data from the store
      user.value = store.getters.user;

      editedUser.value = { ...user.value };
    });

    const editProfile = () => {
      editing.value = true;
    };

    const saveChanges = () => {
      userService.saveProfile(editedUser.value);

      store.dispatch("updateUser", editedUser.value);

      editing.value = false;
    };

    const cancelEdit = () => {
      editing.value = false;
      editedUser.value = { ...user.value };
    };

    return {
      user,
      editing,
      editedUser,
      editProfile,
      saveChanges,
      cancelEdit,
    };
  },
};
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

.edit-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #2980b9;
}

form {
  margin-top: 20px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #45a049;
}
</style>
