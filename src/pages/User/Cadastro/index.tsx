import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUser, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail, MdCall } from 'react-icons/md'
import api from '../../../services/api';
import NavBar from '../../../components/NavBar';
import User from '../../../interfaces/User';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import InputMask from 'react-input-mask';
import axios from 'axios';
import Estado from '../../../interfaces/Estado';
import Cidade from '../../../interfaces/Cidade';


const RegisterPage: React.FC = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [estados, setEstados] = useState<Estado[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [cidadesDoEstado, setCidadesDoEstado] = useState<Cidade[]>([]);
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
        logradouro: "",
        numero_casa: 0
    });

    const listarEstados = async () => {
        const response = await axios.get<Estado[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
        setEstados(response.data);
    }

    const listarMunicipios = async () => {
        const response = await axios.get<Cidade[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios`)
        setCidades(response.data);
        setCidadesDoEstado(response.data)
    }

    const listarMunicipiosPorEstado = async (estadoSigla: string) => {
        if (estadoSigla) {
            const cidadesDoEstadoFitlradas = cidades.filter((cidade) => {
                return cidade.microrregiao.mesorregiao.UF.sigla === estadoSigla;
            });

            setCidadesDoEstado(cidadesDoEstadoFitlradas)
        }
        else {
            setCidadesDoEstado(cidades);
        }
    }

    function updateForm(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        if (e.target.name === 'cidade') {
            const cidadeSelecionada = cidades.find(cidade => cidade.nome === e.target.value);
            if (cidadeSelecionada) {
                const estadoSigla = cidadeSelecionada.microrregiao.mesorregiao.UF.sigla;
                setFormState({
                    ...formState,
                    estado: estadoSigla,
                    cidade: e.target.value,
                });
            } else {
                setFormState({
                    ...formState,
                    estado: '',
                    cidade: e.target.value,
                });
            }
        } else {
            setFormState({
                ...formState,
                [e.target.name]:
                    e.target.value
            })
        }
    };

    const handleGetEndereco = async () => {
        try {
            setCidadesDoEstado(cidades);
            const response = await axios.get(`https://viacep.com.br/ws/${formState.cep}/json/`);
            const addressInfo = response.data;
            setFormState({
                ...formState,
                cep: addressInfo.cep,
                logradouro: addressInfo.logradouro,
                bairro: addressInfo.bairro,
                cidade: addressInfo.localidade,
                estado: addressInfo.uf,
            });
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

    useEffect(() => {
        listarEstados()
        listarMunicipios()
    }, [])

    return (
        <div>
            <NavBar isLogin={true} />
            <main className='main-container'>
                <div className="bem-vindo">
                    <h1 className='roboto-negrito'>Bem-vindo</h1>
                    <h2 className='roboto-regular'>Efetue já seu registro!</h2>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <Form className='d-flex flex-column gap-2' onSubmit={handleRegister}>
                        <div className="d-flex gap-2 col-sm-12">
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
                        </div>
                        <div className="d-flex gap-2">
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
                                <Form.Control
                                    type='text'
                                    name='cep'
                                    value={formState.cep}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                                    as={InputMask}
                                    mask="99999-999"
                                />
                            </Form.Group>
                        </div>
                        <div className="d-flex gap-2">
                        </div>
                        <Button variant="dark" onClick={handleGetEndereco} className='' >
                            Buscar
                        </Button>
                        <div className="d-flex gap-2">
                            <Form.Group controlId="formEstado">
                                <Form.Label className='d-flex align-items-center gap-2'><span>Estado</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    name="estado"
                                    required
                                    value={formState.estado}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        updateForm(e);
                                        listarMunicipiosPorEstado(e.target.value);
                                    }
                                    }
                                >
                                    <option value="">Selecione o Estado</option>
                                    {
                                        estados && estados.map((estado) => (
                                            <option key={estado.id} value={estado.sigla}>
                                                {estado.nome}
                                            </option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group  className="fixed-input-width" controlId="formCidade">
                                <Form.Label className='d-flex align-items-center gap-2'><span>Cidade</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    name="cidade"
                                    required
                                    value={formState.cidade}
                                   
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                                >
                                    <option value="">Selecione a Cidade</option>
                                    {
                                        cidadesDoEstado && cidadesDoEstado.map((cidade) => (
                                            <option key={cidade.id} value={cidade.nome}>
                                                {cidade.nome}
                                            </option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="d-flex gap-2">
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
                        </div>
                        <Form.Group controlId="formNumeroCasa">
                            <Form.Label className='d-flex align-items-center gap-2'><FaMapMarkerAlt /><span>Nº Casa</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite Nº Casa"
                                name="numero_casa"
                                required
                                value={formState.numero_casa}
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
                    <span>
                        <Link to={`/`} className='link-no-style roboto-regular'>Já possuí uma conta?</Link>
                    </span>
                    <span>
                        <Link to={`/inicio`} className='link-no-style roboto-regular'>Quer navegar como visistante?</Link>
                    </span>
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
