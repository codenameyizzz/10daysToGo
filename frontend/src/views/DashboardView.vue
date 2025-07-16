<template>
  <div class="container">
    <h1>Selamat datang di Dashboard!</h1>
    <el-button type="danger" @click="logout">Logout</el-button>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("is_logged_in");
      this.$message.success("Berhasil logout!");
      this.$router.push("/login");
    },
  },
};
</script>
