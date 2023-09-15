import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import auth from '../../services/auth';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const user = await auth.login(username, password);
            localStorage.setItem('user', JSON.stringify(user));
            alert('Logado com sucesso!');
            navigate(0)
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
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
    );
};

export default LoginPage;
