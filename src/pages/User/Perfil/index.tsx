import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import NavBar from '../../../components/NavBar';
import DecodedToken from '../../../interfaces/DecodedToken';
import { TokenExpiredError } from 'jsonwebtoken';

const PerfilUser: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { id: userIdFromUrl } = useParams<{ id: string }>();
  useEffect(() => {
    const token = localStorage.getItem('token');

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
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Perfil</h1>
        <p>Usuario: {userIdFromUrl}</p>
        {userIdFromUrl == userId ? (<Link to={`/update/${userId}`}>Editar minhas informações</Link>) : ""}
      </main>
    </div>
  );
};

export default PerfilUser;
