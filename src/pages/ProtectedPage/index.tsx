import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

interface DecodedToken {
  userId: string; // Defina a estrutura do token JWT
}
const ProtectedPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('user');

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error('Erro ao decodificar o token JWT:', error);
      }
    }
  }, []);

  return (
    <div>
      <h1>Página Protegida</h1>
      <p>Esta é uma página protegida. Apenas usuários autenticados têm acesso.</p>
      <Link to={`/update/${userId}`}>Editar user</Link>
    </div>
  );
};

export default ProtectedPage;
