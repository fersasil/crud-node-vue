import axios from 'axios';
import { EventBus as global} from '@/store/EventBus';




const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer: ' + EventBus.userInfo.token
};


export const axiosAuth = axios.create({
    baseURL: `http://localhost:3000/api/user`,
    headers: headers
});