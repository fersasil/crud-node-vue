<template>
  <div>
    <b-form-input v-model="name" placeholder="Enter your name"></b-form-input>
    <div v-if="name" class="mt-2">Value: {{ name }}</div>
    <hr />
    <b-form-input v-model="password" placeholder="Enter your password"></b-form-input>
    <div v-if="password" class="mt-2">Value: {{ password }}</div>
    <hr />
    <b-button @click="fetchData">Entrar</b-button>
    <hr v-if="token">
    <div v-if="token" class="mt-2">{{ token }}</div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

export default {
  data() {
    return {
      name: "",
      password: "",
      token: ""
    };
  },
  methods: {
    fetchData() {
      const config = {
        headers: { "Content-Type": "application/json" }
      };

      const data = {
        name: this.name,
        password: this.password
      };

      axios.post("login", data, config).then(res => {
        console.log(res.data);
        this.token = res.data.token;
      }).catch((err) => {
          this.token = "Senha inválida!";
          console.log('Senha errada');
      });
    }
  }
};
</script>