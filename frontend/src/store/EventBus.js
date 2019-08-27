import Vue from 'vue';

export const EventBus = new Vue({
    data(){
        return {
            isLogged: false
        }
    }
});