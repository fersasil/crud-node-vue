<template>
  <div>
    <b-row class="mb-4"><h1 class="h1">Register a new account!</h1></b-row>
    <b-form-input v-model="form.name" placeholder="Enter your name"></b-form-input>
    <div v-if="form.name" class="mt-2">Value: {{ form.name }}</div>
    <hr />
    <b-form-input v-model="form.email" placeholder="Enter your email"></b-form-input>
    <div v-if="form.email" class="mt-2">Value: {{ form.email }}</div>
    <hr />
    <b-form-input @blur="verifyEmail" @focusout="verifyEmail" v-model="form.password" placeholder="Enter your password"></b-form-input>
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
    verifyEmail(){
      console.log(this.form.email);
    }, 
      fetchData(){
        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const data = {
            name: this.form.name,
            password: this.form.password,
            email: this.form.email
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