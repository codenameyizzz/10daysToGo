<template>
  <div class="container">
    <el-card class="box-card" style="max-width: 400px; margin: 50px auto;">
      <h2 style="margin-bottom: 20px;">Login</h2>
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

      <!-- Tambahan link ke register -->
      <div style="margin-top: 20px; text-align: center;">
        <span>Belum punya akun? </span>
        <el-link type="primary" @click="$router.push('/register')">
          Daftar di sini
        </el-link>
      </div>
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
        const res = await axios.post("http://localhost:8000/login", this.form);
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
