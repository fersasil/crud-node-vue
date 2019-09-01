import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
};

export const axiosNormal = axios.create({
    baseURL: `http://localhost:3000/`,
    headers: headers
});

export const axiosAuthenticated = axios.create({
    baseURL: `http://localhost:3000/api/user`,
    headers: headers
});