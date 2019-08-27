<template>
  <b-container id="app">
    <app-nav-bar></app-nav-bar>
    <br>
    <router-view/>
  </b-container>
</template>

<script>

import AppNavBar from "@/components/AppNavBar";

export default {
  name: 'App',
  components: {
    AppNavBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
