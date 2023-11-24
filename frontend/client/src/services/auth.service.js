import api from "./api.service";

class authService {
  // async login(data) {
  //   console.log("User và password đăng nhập:", data); // Log thông tin user và password
  //   return (await api.post("/auth/login", data)).data;
  // }
  async login(data) {
    const response = await api.post("/auth/login", data);
    return response.data;
  }
  async register(data) {
    const response = await api.post("/auth/register", data);
    return response.data;
    // return (await api.post("/auth/register")).data;
  }
  async logout(data) {
    return (await api.post("/auth/logout")).data;
  }
}

export default new authService();

// import api from "./api.service";
// class AuthtService {
//   async login(data) {
//     const response = await this.api.post("/login", data);
//     const { token, user } = response.data;

//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));

//     return user;
//   }
//   catch(error) {
//     console.log(error);
//   }
//   logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   }

//   getUser() {
//     // Retrieve user data from local storage
//     const user = localStorage.getItem("user");
//     return user ? JSON.parse(user) : null;
//   }
// }
// export default new AuthtService();
