import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    setAuth(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, { token, user }) {
      commit("setAuth", true);
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("setAuth", false);
      commit("setUser", null);
    },
    async fetchUserCart({ commit }, userId) {
      try {
        const cartData = await userService.cart(userId);
        // Commit a mutation to update the state with the fetched cart data
        commit("setUserCart", cartData);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
});
