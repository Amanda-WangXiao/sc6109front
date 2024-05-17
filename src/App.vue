<template>
  <div id="app">
    <header>
      <h1>Blockchain Voting System</h1>
    </header>
    <div class="nav-buttons">
      <router-link to="/vote" class="button">Choose Vote</router-link>
      <router-link to="/result" class="button">View Result</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>



<style scoped>
header {
  text-align: center;
  background-color: #f0f0f0;
  padding: 20px;
}

.nav-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}
</style>

