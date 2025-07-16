<template>
  <div class="container">
    <el-card class="box-card" style="max-width: 400px; margin: 50px auto;">
      <h2 style="margin-bottom: 20px;">Register</h2>
      <el-form :model="form" label-position="top" @submit.prevent="submit">
        <el-form-item label="Username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Register</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        await axios.post("http://localhost:8000/register", this.form);
        this.$message.success("Register successful! You can login now.");
        this.$router.push("/login");
      } catch (err) {
        this.$message.error(
          "Register failed: " + (err.response?.data?.detail || "Unknown error")
        );
      }
    },
  },
};
</script>
