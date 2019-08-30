<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-col md="6">
          <h1>Users</h1>
        </b-col>
      </b-col>
      <b-col md="6">
        <b-list-group>
          <b-list-group-item v-for="(n, i) in names" :key="i">ID: {{n.id}} Name: {{n.name}}</b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

export default {
  data() {
    return {
      names: []
    };
  },
  methods: {},
  created() {
    console.log("OKA");
    axios.get("/users/u").then(res => {
      const users = [...res.data];
      const names = [];

      for (let i in users) {
        names.push({ name: users[i].name, id: users[i].id });
      }

      this.names = names;
    });
  }
};
</script>