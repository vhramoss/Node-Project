import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Adiciona um interceptor para incluir o token em cada requisição
api.interceptors.request.use(
  (config) => {
    // A chave usada para ler o token deve ser a mesma usada para salvar no Login.tsx
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;