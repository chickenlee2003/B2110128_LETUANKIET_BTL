import api from "./api.service";
class UserService {
  async cart() {
    return (await api.get("/user/cart")).data;
  }
  async addCart(data) {
    return (await api.post("/user/addCart", data)).data;
  }
  async deleteCart(id) {
    return (await api.post("/user/deleteCart", data)).data;
  }
  async updateQuantity(data) {
    return (await api.post("/user/updateQuantity", data)).data;
  }
  async cart(userId) {
    return (await api.get(`/user/cart/${userId}`)).data;
  }
}
export default new UserService();
