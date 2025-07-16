<!-- src/layouts/LayoutDefault.vue -->
<template>
  <div class="layout">
    <AppSidebar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppSidebar from "../components/AppSidebar.vue";

export default {
  name: "LayoutDefault",
  components: {
    AppSidebar,
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
