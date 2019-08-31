import { EventBus } from '@/store/EventBus';

export const hasToken = (to, from, next) => {
    if (EventBus.userLoggedIn) { // mudar para emitir ou vuex!
        next();
        return;
    }

    const userDataEncoded = localStorage.getItem('userInfo');

    if (!userDataEncoded) {
        alert("NAO LOGADO")
        next({ name: 'login' });
        return;
    }

    const userData = JSON.parse(atob(userDataEncoded));


    EventBus.userInfo = userData;
    EventBus.userLoggedIn = true;

    next();

}