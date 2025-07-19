<template>
  <div class="container" style="max-width: 500px; margin: 30px auto">
    <h2>Profil Saya</h2>
    <el-form :model="form" label-position="top" @submit.prevent="updateProfile">
      <el-form-item label="Username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="Password (kosongkan jika tidak diubah)">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">
          Simpan Perubahan
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileView",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const res = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.form.username = res.data.username;
        this.form.email = res.data.email;
      } catch (err) {
        this.$message.error(
          "Gagal memuat profil: " + (err.response?.data?.detail || err.message)
        );
      }
    },
    async updateProfile() {
      try {
        const payload = {
          username: this.form.username,
          email: this.form.email,
        };
        if (this.form.password) {
          payload.password = this.form.password;
        }

        await axios.put("http://localhost:8000/api/profile", payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.$message.success("Profil berhasil diperbarui!");
        this.form.password = ""; // clear password field
      } catch (err) {
        this.$message.error(
          "Gagal memperbarui profil: " +
            (err.response?.data?.detail || err.message)
        );
      }
    },
  },
};
</script>

<style scoped>
.container {
  /* optional centering tweaks */
}
</style>
