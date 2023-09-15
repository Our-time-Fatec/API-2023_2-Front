import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import api from '../../services/api';
import NavBar from '../../components/NavBar';

const EditarUser: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { id } = useParams();

    const handleUpdate = async () => {
        try {
            const tokenJson = localStorage.getItem('user'); // Recupere o token JWT do localStorage como um objeto JSON
            console.log(tokenJson);

            if (tokenJson) {
                const tokenObject = JSON.parse(tokenJson);
                console.log(tokenObject.token)

                const headers = {
                    Authorization: `${tokenObject.token}`, // Inclua o token no cabeçalho de autorização
                };

                const user = await api.put(`/user/${id}`, { username, password }, { headers });
                console.log(user);
                alert('Usuário editado com sucesso!');
                navigate(0);
            } else {
                // Lidar com a ausência do token, como redirecionar para a página de login
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
