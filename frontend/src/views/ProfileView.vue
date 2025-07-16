<template>
  <div>
    <h2>Profil Pengguna</h2>
    <p><strong>Username:</strong> {{ username }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      this.username = payload.sub;
    }
  },
};
</script>