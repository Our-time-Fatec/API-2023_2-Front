import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md'
import NavBar from '../../components/NavBar';
import api from '../../services/api';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        await api.post(`/user/login`, { username, password })
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
            <main className='main-container'>
                <h1 className='mt-3'>Login</h1>
                <div className="d-flex justify-content-center align-items-center login-container mt-5">
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label className='d-flex align-items-center gap-2'><MdEmail /><span>Username</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label className='d-flex align-items-center gap-2'><FaLock /><span>Senha</span></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </Form.Group>
                        <Button variant="primary" onClick={handleLogin} className='mt-2'>
                            Entrar
                        </Button>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
