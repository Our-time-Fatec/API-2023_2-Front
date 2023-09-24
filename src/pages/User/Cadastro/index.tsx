import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUser, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail, MdCall } from 'react-icons/md'
import api from '../../../services/api';
import NavBar from '../../../components/NavBar';
import User from '../../../interfaces/User';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';

const RegisterPage: React.FC = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();

    const [formState, setFormState] = useState<User>({
        username: "",
        email: "",
        password: "",
        telefone: "",
        endereco: ""
    });

    function updateForm(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        setFormState({
            ...formState,
            [e.target.name]:
                e.target.value
        })
    };


    const handleRegister = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsButtonDisabled(true);
        await api.post(`/user/register`, formState)
            .then((response) => {
                alert(response.data.message);
                navigate('/');
            })
            .catch((error) => {
                alert(error.response.data.error)
            })
            .finally(() => {
                setIsButtonDisabled(false);
            });
    };

    return (
        <div className='register'>
            <header>
                <NavBar isLogin={true} />
            </header>
            <main className='main-container'>
                <h1 className='mt-3'>Bem-vindo</h1>
                <h2>Efetue já seu registro!</h2>
                <div className="d-flex justify-content-center align-items-center login-container mt-5">
                    <Form className='d-flex flex-column gap-2' onSubmit={handleRegister}>
                        <Form.Group controlId="formUsername">
                            <Form.Label className='d-flex align-items-center gap-2'><FaUser /><span>Username</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu username"
                                name="username"
                                required
                                value={formState.username}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label className='d-flex align-items-center gap-2'><MdEmail /><span>E-mail</span></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu e-mail"
                                name="email"
                                required
                                value={formState.email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTelefone">
                            <Form.Label className='d-flex align-items-center gap-2'><MdCall /><span>Telefone</span></Form.Label>
                            <PhoneInput
                                country={'br'} 
                                value={formState.telefone}
                                onChange={(value, data, event, formattedValue) => updateForm(event)}
                                inputProps={{
                                    name: 'telefone',
                                    required: true,
                                    'aria-label': 'Telefone',
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEndereco">
                            <Form.Label className='d-flex align-items-center gap-2'><FaMapMarkerAlt /><span>Endereço</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu endereço"
                                name="endereco"
                                required
                                value={formState.endereco}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label className='d-flex align-items-center gap-2'><FaLock /><span>Senha</span></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                name="password"
                                required
                                value={formState.password}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Button variant="primary" type='submit' className='mt-3' disabled={isButtonDisabled}>
                            Registrar-se
                        </Button>
                    </Form>
                </div>
                <div className='options d-flex flex-column align-items-center mt-4'>
                    <span className='d-flex gap-1'>
                        <span>Já possuí uma conta?</span>
                        <Link to={`/`}>Logue aqui!</Link>
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

export default RegisterPage;
