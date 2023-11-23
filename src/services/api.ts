import axios from 'axios';

const api = axios.create({
  baseURL: "https://bicicreta-back.vercel.app"
});

export default api;
