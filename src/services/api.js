import axios from 'axios';

const api = axios.create({
    baseURL: 'https://testegobarber-backend.herokuapp.com/'
});

export default api;