import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md'
import NavBar from '../../components/NavBar';
import api from '../../services/api';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsButtonDisabled(true);
        await api.post(`/user/login`, { email, password })
            .then((response) => {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('username', JSON.stringify(response.data.username));
                alert(response.data.message);
                navigate(0);
            })
            .catch((error) => {
                alert(error.response.data.message)
            })
            .finally(() => {
                setIsButtonDisabled(false);
            });
    };

    return (
        <div className='login'>
            <header>
                <NavBar isLogin={true} />
            </header>
            <main className='main-container'>
                <h1 className='mt-3'>Bem-vindo</h1>
                <h2>Efetue já seu login!</h2>
                <div className="d-flex justify-content-center align-items-center login-container mt-5">
                    <Form className='d-flex flex-column gap-2'>
                        <Form.Group controlId="formEmail">
                            <Form.Label className='d-flex align-items-center gap-2'><MdEmail /><span>Email</span></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <Button variant="primary" onClick={handleLogin} className='mt-3' disabled={isButtonDisabled}>
                            Entrar
                        </Button>
                    </Form>
                </div>
                <div className='options d-flex flex-column align-items-center mt-4'>
                    <span className='d-flex gap-1'>
                        <span>Ainda não tem uma conta?</span>
                        <Link to={`/register`}>Registre-se aqui!</Link>
                    </span>
                    <span className='d-flex gap-1'>
                        <span>Quer navegar como visistante?</span>
                        <Link to={`/inicio`}>Continue aqui!</Link>
                    </span>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
