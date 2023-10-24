import axios from 'axios';

const token = localStorage.getItem('token'); // Pobierz token z localStorage

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Adres Twojego serwera
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
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
  
  export default axiosInstance;