import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://192.168.2.100:3000'
    baseURL: 'http://10.0.0.179:3000'
});

export default api;