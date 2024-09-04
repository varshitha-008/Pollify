import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pollify-yc1z.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});



export default api;
