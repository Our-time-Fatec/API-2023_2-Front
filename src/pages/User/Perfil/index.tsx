import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import NavBar from '../../../components/NavBar';
import DecodedToken from '../../../interfaces/DecodedToken';
import User from '../../../interfaces/User';
import api from '../../../services/api';
import CardBike from '../../../components/Card';

const PerfilUser: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { id: userIdFromUrl } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>();
  const location = useLocation();

  async function getUser() {
    const response = await api.get<User>(`/user/${userIdFromUrl}`)
    setUser(response.data);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    getUser()

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error('Erro ao decodificar o token JWT:', error);
      }
    }
  }, [location.pathname]);

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main className='main-container'>
        <h1>{userIdFromUrl == userId ? "Meu Perfil" : `Perfil de ${user?.username}`}</h1>
        <p>Email: {user?.email}</p>
        <p>Telefone: {user?.telefone}</p>
        <p>Endereço: {user?.endereco}</p>
        {userIdFromUrl == userId ? (<Link to={`/update/${userId}`}>Editar minhas informações</Link>) : ""}
        {userIdFromUrl == userId ? (<Link to={`/bike/cadastrar`}>Cadastrar Bicicleta</Link>) : ""}
        <h1>{userIdFromUrl == userId ? "Minhas Bikes" : `Bikes de ${user?.username}`}</h1>
        <div className="bicicletas d-flex flex-wrap align-items-center justify-content-center gap-3">
          {
            user?.bicicletas && user.bicicletas.map((i) => {
              return (
                <div className="div-bike" key={i.id}>
                  <CardBike marca={i.marca?.nome} modalidade={i.modalidade?.nome} foto={i.fotos && i.fotos[0]?.url} descricao={i.descricao} valorDia={i.valorDia} valorHora={i.valorHora} donoId={i.donoId} isProfile={true} isAlugada={i.isAlugada} />
                </div>
              )
            })
          }
        </div>
      </main>
    </div>
  );
};

export default PerfilUser;
