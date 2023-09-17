import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import api from '../../../services/api';
import NavBar from '../../../components/NavBar';
import DecodedToken from '../../../interfaces/DecodedToken';
import jwtDecode from 'jwt-decode';

const EditarUser: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            if(decodedToken.userId != id){
                navigate("/")
            }
          } catch (error) {
            console.error('Erro ao decodificar o token JWT:', error);
          }

        }
      }, []);

    const handleUpdate = async () => {
        try {
            const tokenJson = localStorage.getItem('token');

            if (tokenJson) {
                const tokenObject = JSON.parse(tokenJson);
                const headers = {
                    Authorization: `${tokenObject}`,
                };
                await api.put(`/user/${id}`, { username, password }, { headers })
                    .then((response) => {
                        alert(response.data.message);
                        navigate(0);
                    })
                    .catch((error) => {
                        alert(error.response.data.message);
                    })
            } else {
            }
        } catch (error) {
            console.error('Erro ao fazer update:', error);
        }
    };

    return (
        <div className='editar'>
            <header>
                <NavBar />
            </header>
            <main>
                <div className="login-container">
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Nome de Usuário</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome de usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FaUser />
                        </Form.Group>

                        <Button variant="primary" onClick={handleUpdate}>
                            Entrar
                        </Button>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default EditarUser;
