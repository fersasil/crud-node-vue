import {EventBus} from '@/store/EventBus';

export const hasToken = (to, from, next) => {
    if(EventBus.userLoggedIn){
        console.log(EventBus);
        next();
        return;
    }

    const userDataEncoded = localStorage.getItem('userInfo');

    console.log(userDataEncoded);

    if(!userDataEncoded){
        alert("NAO LOGADO")
        next({name: 'login'});
        return;
    }
    
    const userData = JSON.parse(atob(userDataEncoded));
    EventBus.userInfo = userData;
    EventBus.userLoggedIn = true;

    
    console.log(to);
    
    next();
 
}