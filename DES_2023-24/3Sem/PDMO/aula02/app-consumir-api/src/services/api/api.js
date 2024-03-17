import axios from 'axios';

const api = axios.create({
    /**
     * Alterar o IP da API sempre que necessário
     */
    baseURL: 'http://192.168.1.89:3000'
});

export default api;