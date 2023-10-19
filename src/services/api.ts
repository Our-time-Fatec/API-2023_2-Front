import axios from 'axios';

const api = axios.create({
  baseURL: "https://bicicreta-api-2023.vercel.app"
});

export default api;
