import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import NavBar from '../../../components/NavBar';
import DecodedToken from '../../../interfaces/DecodedToken';
import User from '../../../interfaces/User';
import api from '../../../services/api';
import CardBike from '../../../components/Card';
import { Button } from 'react-bootstrap';
import './style.css'
const PerfilUser: React.FC = () => {
  const [userId, setUserId] = useState<number>();
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
        setUserId(parseInt(decodedToken.userId));
      } catch (error) {
        console.error('Erro ao decodificar o token JWT:', error);
      }
    }
  }, [location.pathname]);

  const formatPhoneNumber = (phoneNumber: string) => {
    const numericPhone = phoneNumber.replace(/\D/g, '');
    const formattedPhone = numericPhone.startsWith('55') ? numericPhone : `55${numericPhone}`;
    return formattedPhone;
  };

  const formattedPhoneNumber = user?.telefone ? formatPhoneNumber(user.telefone) : '';
  const whatsappLink = `https://wa.me/${formattedPhoneNumber}`;

  return (
    <div>
      <NavBar />
      <main className='main-container'>
        <div className="userDados d-flex flex-column align-items-center justify-content-center roboto-regular">
          <h1 className='meuperfil roboto-regular'>{userIdFromUrl === userId ? "Meu Perfil" : `Perfil de ${user?.username}`}</h1>
          <img className='profile-image' src={user?.imageUser || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} />
          {user?.isAlugando ? <span className='text-green roboto-negrito'>Usuário contém uma locação ativa</span> : ""}
          <p>Email: {user?.email}</p>
          <p>Telefone: {user?.telefone}</p>
          <p>Endereço: {user?.logradouro}</p>
          <p>Avaliacao: {user?.avaliacao}</p>
          <Button variant="success" className='whatsapp' href={whatsappLink} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </Button>
          {userIdFromUrl == userId ? (<Link to={`/update/${userId}`}>Editar minhas informações</Link>) : ""}
          {userIdFromUrl == userId ? (<Link to={`/bike/cadastrar`}>Cadastrar Bicicleta</Link>) : ""}
        </div>
        <div className="userBikes d-flex flex-column justify-content-center align-items-center">
          {user?.bicicletas && user?.bicicletas?.length > 0 ? (
            <>
              <h1 className='mt-2'>{userIdFromUrl == userId ? "Minhas Bikes" : `Bikes de ${user?.username}`}</h1>
              <div className="bicicletas d-flex flex-wrap align-items-center justify-content-center gap-3">
                {user?.bicicletas.map((i) => {
                  return (
                    <div className="div-bike" key={i.id}>
                      <CardBike id={i.id} avaliacao={i.avaliacao} marca={i.marca?.nome} modalidade={i.modalidade?.nome} foto={i.fotos && i.fotos[0]?.url} descricao={i.descricao} valorDia={i.valorDia} valorHora={i.valorHora} donoId={i.donoId} isProfile={true} isAlugada={i.isAlugada} isMyPerfil={userIdFromUrl == userId} usuarioLogadoId={userId} />
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <span className='mt-5'>{user?.username} ainda não tem bicicletas cadastradas.</span>
          )}
        </div>
      </main>
    </div>
  );
};

export default PerfilUser;
