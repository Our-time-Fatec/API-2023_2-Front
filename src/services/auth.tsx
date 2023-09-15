import { useNavigate } from "react-router-dom";
import api from "./api";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

interface User {
    username: string;
    token: string;
}
interface DecodedToken {
  userId: string; // Defina a estrutura do token JWT
  exp: number;
}

const login = async (username: string, password: string): Promise<User> => {
    const response = await api.post(`/user/login`, { username, password });
    return response.data;
};

const logout = (): void => {
    localStorage.removeItem('user');
};

function isTokenExpired(tokenJson: string | null): boolean {
  if (!tokenJson) {
      return true;
  }
  const decodedToken = jwtDecode<DecodedToken>(tokenJson);

  if (!decodedToken.exp) {
      return false; 
  }
  console.log('verificou')
  const currentTimestamp = Math.floor(Date.now() / 1000);
  
  return decodedToken.exp < currentTimestamp;
}

function AuthMiddleware({ children }: { children: React.ReactNode }) {

    useEffect(() => {
      const tokenJson = localStorage.getItem('user');
      if (isTokenExpired(tokenJson)) {
        localStorage.removeItem('user');
      }
    }, []);
  
    return children as JSX.Element;
  }
  

export default {
    login,
    logout,
    AuthMiddleware
};