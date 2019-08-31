import Vue from 'vue';

export const EventBus = new Vue({
    data: {
        userLoggedIn: false,
        userInfo: {}
    },
    methods: {
        setLoginData(user) {
            this.userInfo = user,
                this.userLoggedIn = true;
        },
        getThis() {
            console.log(this.data);
            return this.data
        }
    },
});