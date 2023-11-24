import api from "./api.service";
class ProductService {
  async getAll() {
    return (await api.get("/product")).data;
  }
  async create(data) {
    return (await api.post("/product", data)).data;
  }
  async get(id) {
    return (await api.get(`/product/${id}`)).data;
  }
  async getbyname(name) {
    return (await api.get("/product/getbyname", { params: { name } })).data;
  }
  async updateProduct(id, data) {
    return (await api.patch(`/product/${id}`, data)).data;
  }
  async delete(id) {
    return (await api.delete(`/product/${id}`)).data;
  }
}
export default new ProductService();
