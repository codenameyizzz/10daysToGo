<template>
  <div class="container">
    <el-card class="box-card" style="max-width: 400px; margin: 50px auto">
      <h2 style="margin-bottom: 20px">Login</h2>
      <el-form :model="form" label-position="top" @submit.prevent="submit">
        <el-form-item label="Username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        // build x-www-form-urlencoded payload
        const formData = new URLSearchParams();
        formData.append("username", this.form.username);
        formData.append("password", this.form.password);

        // Call the /api/login route
        const res = await axios.post(
          "http://localhost:8000/api/login",
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("is_logged_in", "true");
        this.$message.success("Login successful!");
        this.$router.push("/dashboard");
      } catch (err) {
        this.$message.error(
          "Login failed: " + (err.response?.data?.detail || "Unknown error")
        );
      }
    },
  },
};
</script>

<style scoped>
.container {
  /* optional centering */
}
.box-card {
  /* optional styling */
}
</style>
