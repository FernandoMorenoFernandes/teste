// src/api.js

import axios from 'axios';

// Configuração do Axios
const api = axios.create({
    baseURL: 'http://192.168.0.22:8080', // URL base do seu backend (ajuste para o endereço correto)
    headers: {
        'Content-Type': 'multipart/form-data', // Para enviar dados com imagens
    },
});

export default api;

