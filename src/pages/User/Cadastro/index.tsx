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
import InputMask from 'react-input-mask';
import './cadastro.css';
import axios from 'axios';


const RegisterPage: React.FC = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();

    const [formState, setFormState] = useState<User>({
        username: "",
        email: "",
        password: "",
        telefone: "",
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        logradouro: ""
    });

    function updateForm(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        setFormState({
            ...formState,
            [e.target.name]:
                e.target.value
        })
    };

    const handleGetEndereco = async () => {
        console.log(formState.cep)
        try {

            const response = await axios.get(`https://viacep.com.br/ws/${formState.cep}/json/`);
            const addressInfo = response.data;

            setFormState({
                ...formState,
                cep: addressInfo.cep,
                logradouro: addressInfo.logradouro,
                bairro: addressInfo.bairro,
                cidade: addressInfo.localidade,
                estado: addressInfo.uf,
            })
        } catch (error) {
            console.error('Erro ao buscar informações do CEP:', error);
            setFormState({
                ...formState,
                logradouro: '',
                bairro: '',
                cidade: '',
                estado: '',
            })
        }
    }

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
                        <Form.Group controlId="formCep">
                            <Form.Label className='d-flex align-items-center gap-2'><FaMapMarkerAlt /><span>CEP</span></Form.Label>
                            {/* Input causando erro no console, manter temporario e trocar futuramente por outro */}
                            <InputMask
                                type='text'
                                name='cep'
                                mask="99999-999"
                                value={formState.cep}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        {/* Botão de buscar endereço em local temporario, trocar futuramente */}
                        <Button variant="dark" onClick={handleGetEndereco} className='mt-3' >
                            Buscar
                        </Button>
                        <Form.Group controlId="formEstado">
                            <Form.Label className='d-flex align-items-center gap-2'><FaMapMarkerAlt /><span>Estado</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu Estado"
                                name="uf"
                                required
                                value={formState.estado}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCidade">
                            <Form.Label className='d-flex align-items-center gap-2'><FaMapMarkerAlt /><span>Cidade</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu Cidade"
                                name="cidade"
                                required
                                value={formState.cidade}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBairro">
                            <Form.Label className='d-flex align-items-center gap-2'><FaMapMarkerAlt /><span>Bairro</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu Bairro"
                                name="bairro"
                                required
                                value={formState.bairro}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLogradouro">
                            <Form.Label className='d-flex align-items-center gap-2'><FaMapMarkerAlt /><span>Logradouro</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu logradouro"
                                name="logradouro"
                                required
                                value={formState.logradouro}
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
                        <Button variant="dark" type='submit' className='mt-3' disabled={isButtonDisabled}>
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
