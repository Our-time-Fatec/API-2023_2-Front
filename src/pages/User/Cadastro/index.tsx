import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import api from '../../../services/api';
import NavBar from '../../../components/NavBar';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        await api.post(`/user/register`, { username, password })
            .then((response) => {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('username', JSON.stringify(response.data.username));
                alert(response.data.message);
                navigate(0);
            })
            .catch((error) => {
                alert(error.response.data.message)
            })
    };

    return (
        <div className='login'>
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
                        <Form.Group controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FaLock />
                        </Form.Group>
                        <Button variant="primary" onClick={handleLogin}>
                            Entrar
                        </Button>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
