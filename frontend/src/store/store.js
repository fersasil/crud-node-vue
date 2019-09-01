import Vue from 'vue';
import Vuex from 'vuex';
import { axiosNormal as axios } from "@/axios/authenticated";
import { axiosAuthenticated as axiosAuth } from "@/axios/authenticated";
import router from '@/router/index'

const expireTimeDate = expireInSeconds => {
    const now = new Date();
    const expireTimeMiliseconds = now.getTime() + expireInSeconds * 1000;
    console.log()
    return new Date(expireTimeMiliseconds);
}

const saveLocalStorage = (data => {
    //get expireTime from user info
    data.expiresIn = expireTimeDate(data.expiresIn);

    const dataEncoded = btoa(JSON.stringify(data));

    //atob() btoa()

    localStorage.setItem('data', dataEncoded);
    // localStorage.setItem('expires', data.expiresIn);
})


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idToken: null,
        userId: null,
        userName: null,
    },
    mutations: {
        authUser(state, payload) {
            state.idToken = payload.idToken;
            state.userId = payload.userId;
            state.userName = payload.userName;
        },
        wipeUserInfo(state) {
            state.idToken = null;
            state.userId = null;
            state.userName = null;
            state.userInfo = null;
        },
        saveUser(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        isLoggedIn({ commit }) {
            const encodedData = localStorage.getItem("data");

            if (!encodedData) {
                return
            }

            const decodedData = atob(encodedData);
            const data = JSON.parse(decodedData);

            const now = new Date();

            // console.log(JSON.parse(data))
            if (now >= data.expiresIn) {
                //wipe localstorage
                return;
            }

            commit('authUser', data);
            // router.push({ name: 'Dashboard' });
        },
        setLogoutTimer({ dispatch }, expiresIn) {
            setTimeout(_ => {
                dispatch('logout')
            }, expiresIn * 1000);
        },
        signup({ commit, dispatch }, authData) {
            axios
                .post("create", authData)
                .then(res => {
                    if (res.data.success) {
                        this.errors.push({ error: "Email" });
                    } else {
                        const userInfo = {
                            idToken: res.data.token,
                            userName: res.data.name,
                            userId: res.data.userId
                        }

                        commit('authUser', userInfo);

                        router.push({ name: "Dashboard" });
                        dispatch('setLogoutTimer', res.data.expiresIn);

                        userInfo.expiresIn = res.data.expiresIn;
                        saveLocalStorage(userInfo);
                    }
                })
                .catch(err => {});

        },

        login({ commit, dispatch }, authData) {
            axios
                .post("login", authData)
                .then(res => {
                    const userInfo = {
                        idToken: res.data.token,
                        userName: res.data.name,
                        userId: res.data.userId
                    }

                    commit('authUser', userInfo);

                    router.push({ name: "Dashboard" });
                    dispatch('setLogoutTimer', res.data.expiresIn);

                    userInfo.expiresIn = res.data.expiresIn;
                    saveLocalStorage(userInfo);
                })
                .catch(err => {
                    // this.errors.push({ error: "Email or password invalids!" });
                });

        },

        logout({ commit }) {
            commit('wipeUserInfo');
            //wipe storage too
            localStorage.removeItem("data");

            router.replace({ name: 'Home' });
        },
    },
    getters: {
        userLoggedIn(state) {
            return state.userId ? true : false;
        },
        getUserName(state) {
            return state.userName;
        },
        getUserId(state) {
            return state.userId;
        },
        getToken(state) {
            console.log();
            return state.idToken;
        }
    }
});