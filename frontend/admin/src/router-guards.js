import store from "./store/store";

export const requireAuth = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    // If the user is authenticated, proceed to the route
    next();
  } else {
    // If the user is not authenticated, redirect to the login page
    next({ name: "Login" });
  }
};
