// store.js
import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    setAuth(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    login({ commit }, token) {
      commit("setAuth", true);
    },
    logout({ commit }) {
      commit("setAuth", false);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
});
