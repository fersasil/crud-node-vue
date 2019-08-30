<template>
  <h1>Ola mundo</h1>
</template>

<script>
import { axiosAuth as axios } from "@/axios/authenticated";
import { EventBus } from "@/store/EventBus";

export default {
  created() {
    //Get info from server
    axios.get("profile-info")
    .then(res => {
      // console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
    ;
  }
};
</script>

<style>
</style>