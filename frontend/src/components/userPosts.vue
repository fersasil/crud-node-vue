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

    <p v-if="success">
      <b-alert variant="success" show>
        <b>{{token}}</b>
      </b-alert>
    </p>

    <b-form-input v-model="email" placeholder="Enter your email"></b-form-input>
    <div v-if="email" class="mt-2">Value: {{ email }}</div>
    <hr />
    <b-form-input v-model="password" placeholder="Enter your password"></b-form-input>
    <div v-if="password" class="mt-2">Value: {{ password }}</div>
    <hr />
    <b-button @click="fetchData">Login</b-button>
  </div>
</template>

<script>
import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3000";
import {axiosNormal as axios} from "../axios/authenticated";

export default {
  data() {
    return {
      email: "",
      password: "",
      token: "",
      errors: [],
      success: ''
    };
  },
  methods: {
    fetchData() {
      this.errors = [],
      this.success = false;

      const config = {
        headers: { "Content-Type": "application/json" }
      };

      const data = {
        email: this.email,
        password: this.password
      };

      axios
        .post("login", data, config)
        .then(res => {
          this.token = res.data.token;
          this.success = true;
          localStorage.userInfo = res;
          localStorage.token = res.data.token;
          this.$router.push('Dashboard'); 
        })
        .catch(err => {
          this.errors.push({error: "Email or password invalids!"});
        });
    }
  }
};
</script>