<template>
  <div>
    <p v-if="errors.length">
      <b-alert variant="warning" show>
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <b-row>
            <p v-for="(error, i) in errors" :key="i">{{ error.error}}</p>
          </b-row>
        </ul>
      </b-alert>
    </p>
    <b-card  style="max-width: 75rem;" title="Login">
    <div class="w-50 mx-auto">
      <b-form-input class="mb-4 mt-4" v-model="email" placeholder="Enter your email"></b-form-input>
      <b-form-input class="mb-4" v-model="password" placeholder="Enter your password"></b-form-input>
      <b-button @click="fetchData">Login</b-button>
    </div>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

export default {
  data() {
    return {
      email: "",
      password: "",
      token: "",
      errors: [],
      success: ""
    };
  },
  methods: {
    fetchData() {
      this.errors = []; 
      this.success = false;
      const data = {
        email: this.email,
        password: this.password
      };
      
      this.$store.dispatch('login', data);
    }
  }
};
</script>

<style scoped>

</style>