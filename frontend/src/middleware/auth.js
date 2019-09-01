import store from "@/store/store";

const getDataStorage = _ => {
    const encodedData = localStorage.getItem('data');
    if (!encodedData) {
        return false;
    }

    const decodedData = atob(encodedData);
    const data = JSON.parse(decodedData);
    data.expiresIn = new Date(data.expiresIn);
    return data;
}

export const isLogged = (to, from, next) => {
    if (store.state.idToken) {
        next({ name: 'Dashboard' });
        return;
    }

    const data = getDataStorage();

    if (!data) {
        next();
        return;
    }

    const now = new Date();

    if (now >= data.expiresIn) {
        next();
    } else {
        next({ name: 'Dashboard' });
        return;
    }
}

export const protectLoggedRoutes = (to, from, next) => {
    if (store.state.idToken) {
        next();
        return;
    }

    const data = getDataStorage();

    if (!data) {
        next({ name: 'login' });
        return;
    }

    const now = new Date();

    if (now >= data.expiresIn) {
        next({ name: 'login' });
    } else {
        next();
    }

}