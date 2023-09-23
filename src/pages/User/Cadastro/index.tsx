import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUser, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail, MdCall } from 'react-icons/md'
import api from '../../../services/api';
import NavBar from '../../../components/NavBar';
import User from '../../../interfaces/User';

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
                navigate('/login');
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
                <h1 className='mt-3'>Registrar-se</h1>
                <div className="d-flex justify-content-center align-items-center login-container mt-5">
                    <Form onSubmit={handleRegister}>
                        <Form.Group controlId="formUsername">
                            <Form.Label className='d-flex align-items-center gap-2'><FaUser /><span>Username</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu username"
                                name="username"
                                value={formState.username}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label className='d-flex align-items-center gap-2'><MdEmail /><span>E-mail</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu e-mail"
                                name="email"
                                value={formState.email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTelefone">
                            <Form.Label className='d-flex align-items-center gap-2'><MdCall /><span>Telefone</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu telefone"
                                name="telefone"
                                value={formState.telefone}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEndereco">
                            <Form.Label className='d-flex align-items-center gap-2'><FaMapMarkerAlt /><span>Endereço</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu endereço"
                                name="endereco"
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
                                value={formState.password}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Button variant="primary" type='submit' className='mt-2' disabled={isButtonDisabled}>
                            Registrar-se
                        </Button>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
