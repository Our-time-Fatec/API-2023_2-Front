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
import PhoneInput from 'react-phone-input-2';

const EditarUser: React.FC = () => {
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const { id } = useParams();
    const [imagem, setImagem] = useState<File | null>(null);
    const [formState, setFormState] = useState<User>({
        username: "",
        imageUser: "",
        email: "",
        telefone: "",
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        logradouro: ""
    });

    async function getUser() {
        const response = await api.get<User>(`/user/${id}`)
        setFormState(response.data);
    }

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

            if (allowedTypes.includes(selectedFile.type)) {
                setImagem(selectedFile);
            } else {
                alert("Por favor, selecione um arquivo de imagem válido (JPEG, PNG, GIF ou WebP).");
                e.target.value = "";
            }
        } else {
            setImagem(null);
        }
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
                <NavBar />
            <main className='main-container'>
                <h1 className='mt-3'>Editar minhas informações</h1>
                <div className="d-flex justify-content-center align-items-center login-container mt-5">
                    <Form className='d-flex flex-column gap-2' onSubmit={handleUpdate}>
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
                        <Form.Group controlId="formLogradouro">
                            <Form.Label className='d-flex align-items-center gap-2'><FaMapMarkerAlt /><span>Logradouro</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu Logradouro"
                                name="logradouro"
                                required
                                value={formState.logradouro}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formimageUser">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Imagem de Perfil</span></Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Insira uma imagem para o seu perfil"
                            name="foto"
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageChange(e)}
                        />
                    </Form.Group>
                        <Button variant='dark' type='submit' className='mt-2' disabled={isButtonDisabled}>
                            Editar
                        </Button>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default EditarUser;
