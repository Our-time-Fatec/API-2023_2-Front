import axios from 'axios';

const api = axios.create({
  baseURL: "https://api-2023-2-back.vercel.app"
});

export default api;
