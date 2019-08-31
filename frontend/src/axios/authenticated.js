import axios from 'axios';

const userDataEncoded = localStorage.getItem('userInfo');
const userData = JSON.parse(atob(userDataEncoded));


const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer: ' + userData.token
};

export const axiosAuth = axios.create({
    baseURL: `http://localhost:3000/api/user`,
    headers: headers
});