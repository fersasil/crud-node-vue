<template>
  <form @submit="fetchData" method="POST">
    <p v-if="errors.length">
      <b-alert variant="warning" show>
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li v-for="(error, i) in errors" :key="i">{{ error.error }}</li>
        </ul>
      </b-alert>
    </p>

    <b-form-input v-model="name" placeholder="Enter your name" class="mb-4"></b-form-input>

    <b-form-input v-model="email" placeholder="Enter your email" class="mb-4"></b-form-input>
    <b-form-input v-model="password" placeholder="Enter your password"></b-form-input>
    <hr />
    <b-button @click="fetchData">Register</b-button>
  </form>
</template>

<script>
import axios from "axios";
import { EventBus } from "@/store/EventBus";

axios.defaults.baseURL = "http://localhost:3000";

export default {
  data() {
    return {
      name: "",
      password: "",
      email: "",
      errors: [],
      success: ""
    };
  },
  methods: {
    fetchData(e) {
      e.preventDefault();

      this.errors = [];
      this.success = false;

      if (this.name === "") {
        this.errors.push("O nome do produto é obrigatório.");
      } else {
        const config = {
          headers: { "Content-Type": "application/json" }
        };

        const data = {
          name: this.name,
          password: this.password,
          email: this.email
        };

        console.log(data);

        axios
          .post("create", data, config)
          .then(res => {
            if (res.data.success) {
              this.errors.push({ error: "Email" });
            } else {
              //Sucesso
              EventBus.setLoginData(res.data);
              this.$router.push({ name: "Dashboard" });
            }
          })
          .catch(err => {});
      }
    }
  }
};
</script>

<style>
</style>