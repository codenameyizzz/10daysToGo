<template>
  <el-menu class="AppSidebar" router default-active="/dashboard">
    <el-menu-item index="/dashboard">Simulasi</el-menu-item>
    <el-menu-item index="/profile">Profil</el-menu-item>
    <el-menu-item @click="logout">Logout</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("is_logged_in");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  border-right: 1px solid #eaeaea;
}
</style>