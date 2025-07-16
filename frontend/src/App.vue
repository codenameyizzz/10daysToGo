<template>
  <div id="app">
    <router-view /> <!-- Ini yang akan menampilkan LoginView atau RegisterView -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  background-color: #f5f5f5;
  font-family: sans-serif;
}
</style>
