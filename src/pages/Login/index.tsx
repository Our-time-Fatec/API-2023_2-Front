import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md'
import jwtDecode from 'jwt-decode';
import DecodedCredentials from '../../interfaces/DecodedCredentials';
import NavBar from '../../components/NavBar';
import api from '../../services/api';


const LoginPage: React.FC = () => {
    const GoogleClientID = "566301157527-aut27gjlbju21ompvdtfjs4tq139ti3s.apps.googleusercontent.com";
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
                localStorage.setItem('imageUser', JSON.stringify(response.data.imageUser));
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

    const responseGoogle = (response: any) => {
        const credentialsDecode = jwtDecode<DecodedCredentials>(response.credential);
        handleAuthGoogle(credentialsDecode);
    };

    const handleAuthGoogle = async (credentialsDecode: DecodedCredentials) => {
        setIsButtonDisabled(true);
        await api.post(`/user/authGoogle`, credentialsDecode)
            .then((response) => {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('username', JSON.stringify(response.data.username));
                localStorage.setItem('imageUser', JSON.stringify(response.data.imageUser));
                alert(response.data.message);
                navigate(0);
            })
            .catch((error) => {
                alert(error.response.data.error)
            })
            .finally(() => {
                setIsButtonDisabled(false);
            });
    };

    return (
        <GoogleOAuthProvider clientId={GoogleClientID}>
            <div className='login'>
                <NavBar isLogin={true} />
                <main className='main-container'>
                    <div className="bem-vindo">
                        <h1 className='roboto-negrito'> Bem-vindo</h1>
                        <h2 className='roboto-regular'>Efetue seu login!</h2>
                    </div>
                    <div className="d-flex justify-content-center align-items-center login-container mt-1 roboto-regular">
                        <Form className='d-flex flex-column gap-2'>
                            <Form.Group controlId="formEmail">
                                <Form.Label className='d-flex align-items-center gap-2 roboto-negrito'><MdEmail /><span>Email</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Digite seu Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label className='d-flex align-items-center gap-2 roboto-negrito'><FaLock /><span>Senha</span></Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </Form.Group>
                            <Button variant="dark" onClick={handleLogin} className='mt-3 custom-login-button roboto-negrito' disabled={isButtonDisabled}>
                                Entrar
                            </Button>

                        </Form>
                    </div>
                    <GoogleLogin
                        onSuccess={responseGoogle}
                    />
                    <div className='options d-flex flex-column align-items-center mt-1 '>
                        <span className='d-flex'>
                            <Link to={`/register`}  className='link-no-style roboto-regular'>Quero criar uma conta!</Link>
                        </span>
                        <span className='d-flex'>
                            <Link to={`/inicio`}  className='link-no-style roboto-regular'>Continuar como visitante!</Link>
                        </span>
                    </div>
                </main>
            </div>
        </GoogleOAuthProvider>
    );
};

export default LoginPage;
