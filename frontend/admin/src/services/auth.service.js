import api from "./api.service";

class authService {
  async loginadmin(data) {
    // console.log("User và password đăng nhập:", data); // Log thông tin user và password
    // return (await api.post("admin/loginadmin", data)).data;
    const response = await api.post("/admin/loginadmin", data);
    return response.data;
  }

  async registeradmin(data) {
    return (await api.post("/admin/registeradmin")).data;
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
