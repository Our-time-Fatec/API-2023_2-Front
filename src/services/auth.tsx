import { useLocation, useNavigate } from "react-router-dom";
import api from "./api";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import DecodedToken from "../interfaces/DecodedToken";
import User from "../interfaces/User";

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

  const currentTimestamp = Math.floor(Date.now() / 1000);

  return decodedToken.exp < currentTimestamp;
}

function AuthMiddleware({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('user');

  // Executar verificação de token após mudança de rota.
  useEffect(() => {
    const tokenJson = localStorage.getItem('user');
    if (isTokenExpired(tokenJson)) {
      localStorage.removeItem('user');
    }
  }, [location.pathname, isAuthenticated]);

  // Executar verificação de token de 1 em 1 hora
  useEffect(() => {
    const intervalId = setInterval(() => {
      const tokenJson = localStorage.getItem('user');
      if (isTokenExpired(tokenJson)) {
        localStorage.removeItem('user');
        navigate(0);
      }
    }, 60 * 60 * 1000); // 1 Hora em milissegundos

    return () => clearInterval(intervalId);
  }, [navigate]);

  return <>{children}</>;
}

export default {
  login,
  logout,
  AuthMiddleware
};