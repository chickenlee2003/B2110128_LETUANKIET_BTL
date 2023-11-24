<template>
  <div>
    <NavBar />

    <div class="body" style="min-height: 650px">
      <router-view />
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
};
</script>
