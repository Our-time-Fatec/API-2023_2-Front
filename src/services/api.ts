import axios from 'axios';

const API_URL = 'http://localhost:3001';

interface User {
  username: string;
  token: string;
}

const login = async (username: string, password: string): Promise<User> => {
  const response = await axios.post(`${API_URL}/user/login`, { username, password });
  return response.data;
};

const logout = (): void => {
  localStorage.removeItem('user');
};

export default {
  login,
  logout,
};
