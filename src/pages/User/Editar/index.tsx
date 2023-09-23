import { useNavigate, useParams } from 'react-router-dom';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUser, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail, MdCall } from 'react-icons/md'
import api from '../../../services/api';
import NavBar from '../../../components/NavBar';
import DecodedToken from '../../../interfaces/DecodedToken';
import jwtDecode from 'jwt-decode';
import User from '../../../interfaces/User';

const EditarUser: React.FC = () => {
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const { id } = useParams();
    const [formState, setFormState] = useState<User>({
        username: "",
        email: "",
        telefone: "",
        endereco: ""
    });

    async function getUser() {
        const response = await api.get<User>(`/user/${id}`)
        setFormState(response.data);
    }

    function updateForm(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormState({
            ...formState,
            [e.target.name]:
                e.target.value
        })
    };


    const handleUpdate = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const tokenJson = localStorage.getItem('token');
            setIsButtonDisabled(true);

            if (tokenJson) {
                const tokenObject = JSON.parse(tokenJson);
                const headers = {
                    Authorization: `${tokenObject}`,
                };
                await api.put(`/user/${id}`, formState, { headers })
                    .then((response) => {
                        alert(response.data.message);
                        localStorage.setItem('username', JSON.stringify(formState.username));
                        navigate(`/perfil/${id}`);
                    })
                    .catch((error) => {
                        alert(error.response.data.error);
                    })
                    .finally(() => {
                        setIsButtonDisabled(false);
                    });
            } else {
            }
        } catch (error) {
            console.error('Erro ao fazer update:', error);
            setIsButtonDisabled(false);
        }
    };

    useEffect(() => {
        getUser()
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                if (decodedToken.userId != id) {
                    navigate("/")
                }
            } catch (error) {
                console.error('Erro ao decodificar o token JWT:', error);
            }

        }
    }, []);


    return (
        <div className='editar'>
            <header>
                <NavBar />
            </header>
            <main className='main-container'>
                <h1 className='mt-3'>Editar minhas informações</h1>
                <div className="d-flex justify-content-center align-items-center login-container mt-5">
                    <Form onSubmit={handleUpdate}>
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
                        <Button variant="primary" type='submit' className='mt-2' disabled={isButtonDisabled}>
                            Editar
                        </Button>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default EditarUser;
