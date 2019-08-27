<template>
  <div>
    <b-form-input v-model="form.name" placeholder="Enter your name"></b-form-input>
    <div v-if="form.name" class="mt-2">Value: {{ form.name }}</div>
    <hr />
    <b-form-input v-model="form.password" placeholder="Enter your password"></b-form-input>
    <div v-if="form.password" class="mt-2">Value: {{ form.password }}</div>
    <hr />
    <b-button @click="fetchData">Register</b-button>
    <hr v-if="form.result" />
    <div v-if="form.result" class="mt-2">
        <b-alert variant="success" show>User created!</b-alert>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000";

export default {
  data() {
    return {
        form: {
            name: "",
            password: "",
            result: false
        }
    };
  },
  methods: {
      fetchData(){
        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const data = {
            name: this.form.name,
            password: this.form.password
        };

        axios.post('create', data, config)
        .then(res => {
            if(res.data) this.form.result = true;
        })
        .catch(err => {

        });
      }
  }
};
</script>

<style>
</style>