<template>
<div>
  <div>
    <b-form-group
      style="max-width: 40rem"
      label-cols-sm="4"
      label-cols-lg="3"
      description="Edit this field if you want."
      label="Enter your email"
      label-for="input-horizontal"
      :invalid-feedback="invalidFeedbackEmail"
      :valid-feedback="validFeedbackEmail"
      :state="stateEmail"
    >
      <b-form-input v-model="email" id="input-horizontal"></b-form-input>
    </b-form-group>
  </div>

  <div>
    <b-form-group
      style="max-width: 40rem"
      label-cols-sm="4"
      label-cols-lg="3"
      label="Enter your name"
      label-for="input-horizontal"
      :invalid-feedback="invalidFeedbackName"
      :valid-feedback="validFeedbackName"
      :state="stateName"
    >
      <b-form-input v-model="name" id="input-horizontal"></b-form-input>
    </b-form-group>
  </div>
  <b-form-group
      style="max-width: 40rem">
  <b-button :class="buttonClass" @click="fetchData">Edit</b-button>
  </b-form-group>
  

</div>
</template>

<script>
import { axiosAuth as axios } from "@/axios/authenticated";
import { EventBus } from "@/store/EventBus";

export default {
  data(){
    return {
      name: '',
      email: '',
      errors: [],
      stateEmail: false,
      stateName: false,
      buttonClass: 'disabled'
    }
  },
  computed: {
    invalidFeedbackName() {
      if (this.name.length === 0) {
        return 'Please enter something'
      } else if (this.name.length < 4) {
        return 'Enter at least 4 characters'
      }
    },
    validFeedbackName() {
      return this.state === true ? 'Thank you' : ''
    },
    invalidFeedbackEmail() {
      if (this.email.length === 0) {
        return 'Please enter something'
      } else if (this.email.length < 4) {
        return 'Enter at least 4 characters'
      }
    },
    validFeedbackEmail() {
      return this.state === true ? 'Thank you' : ''
    },
    validFeedbackName() {
      return this.state === true ? 'Thank you' : ''
    },
  },
  methods: {
    fetchData(){
      if(buttonClass === 'disabled')
        return;
      alert('ok')
    }
  },
  created() {
    //Get info from server
    axios.get("profile-info")
    .then(res => {
      this.name = res.data.user.name;
      this.email = res.data.user.email;
    })
    .catch(err => {
      console.log(err);
      localStorage.removeItem("userInfo");
      alert("You're logout");
      this.$router.push({name: 'login'});
    })
    ;
  }
};
</script>

<style>
</style>