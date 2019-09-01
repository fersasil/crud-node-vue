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
                <b-form-input
                    v-model="email"
                    id="input-horizontal"
                ></b-form-input>
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
                <b-form-input
                    v-model="name"
                    id="input-horizontal"
                ></b-form-input>
            </b-form-group>
        </div>
        <b-form-group style="max-width: 40rem">
            <b-button
                :class="buttonAvaliable"
                @click="fetchData"
            >Edit</b-button>
        </b-form-group>

    </div>
</template>

<script>
import { axiosAuthenticated as axiosAuth } from "@/axios/authenticated";

export default {
    data() {
        return {
            name: "",
            email: "",
            errors: [],
            stateEmail: false,
            stateName: false,
            defaultName: '',
            defaultEmail: ''
        };
    },
    computed: {
        invalidFeedbackName() {
            this.stateName = false;  

            if (this.name.length === 0) {
                return "Please enter something";
            } else if (this.name.length < 4) {
                return "Enter at least 4 characters";
            }
            else if(this.name !== this.defaultName){
                this.stateName = true;
            }
        },
        invalidFeedbackEmail() {
            this.stateEmail = false;

            if (this.email.length === 0) {
                this.stateEmail = false;
                return "Please enter something";
            } else if (this.email.length < 4) {
                this.stateEmail = false;
                return "Enter at least 4 characters";
            }
            else if(this.email !== this.defaultEmail){
                this.stateEmail = true;
            }
        },
        validFeedbackEmail() {
            return this.stateEmail === true ? "Thank you" : "";
        },
        validFeedbackName() {
            return this.stateName === true ? "Thank you" : "";
        },
        buttonAvaliable(){
            return this.stateEmail || this.stateName ? '' : 'disabled'
        }
    },
    methods: {
        fetchData() {
            if(!this.stateName && !this.stateEmail){
                return;
            }
            axiosAuth.defaults.headers["Authorization"] = "Bearer: " + this.$store.getters.getToken;
            
            const data = {
                id: this.$store.getters.getUserId,
                name: this.name !== this.defaultName ? this.name : '',
                email: this.email !== this.defaultEmail ? this.email : ''
            }

            axiosAuth.put('update-user-profile', data)
            .then(res => {
                if(!res.data.updated){
                    alert("Algum erro estranho ocorreu")
                    return;
                }

                if(this.name !== this.defaultName){
                    const userData = {name: this.name};
                    this.$store.dispatch('updateUser', userData);
                }

                this.stateEmail = false;
                this.stateName = false;
                this.defaultName = this.name; 
                this.defaultEmail = this.email;

                alert("Dados alterados com sucesso");
                
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    created() {
        axiosAuth.defaults.headers["Authorization"] = "Bearer: " + this.$store.getters.getToken;
        //Get info from server
        axiosAuth
            .get("profile-info")
            .then(res => {
              this.name = res.data.name;
              this.email = res.data.email;

              this.defaultName = res.data.name;
              this.defaultEmail = res.data.email;
            })
            .catch(err => {
                console.log(err);
            });

    }
};
</script>

<style>
</style>