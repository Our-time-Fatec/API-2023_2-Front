import { useNavigate, useParams } from 'react-router-dom';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import NavBar from '../../../components/NavBar';
import Generos from '../../../Enums/Genero';
import Bicicleta from '../../../interfaces/Bicicleta';
import Marchas from '../../../Enums/Marcha';
import Aro from '../../../Enums/Aro';
import Material from '../../../Enums/Material';
import Suspensao from '../../../Enums/Suspensao';
import Marca from '../../../interfaces/Marca';
import Modalidade from '../../../interfaces/Modalidade';
import jwtDecode from 'jwt-decode';
import DecodedToken from '../../../interfaces/DecodedToken';
import './style.css'

const EditarBikePage: React.FC = () => {
    const navigate = useNavigate();
    const { id, donoId } = useParams();
    const tokenJson = localStorage.getItem('token');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modalidades, setModalidades] = useState<Marca[]>([]);
    const [formState, setFormState] = useState<Bicicleta>({
        tamanho: "",
        cor: "",
        generos: "" as Generos,
        marchas: "" as Marchas,
        aro: "" as Aro,
        material: "" as Material,
        suspensao: "" as Suspensao,
        descricao: "",
        valorHora: 0,
        valorDia: 0,
        marcaId: 0,
        modalidadeId: 0,
        donoId: 0,
        isAlugada: false
    });

    async function getMarcasModalidades() {

        if (tokenJson) {
            const tokenObject = JSON.parse(tokenJson);
            const headers = {
                Authorization: `${tokenObject}`,
            };
            const marcasResponse = await api.get<Marca[]>(`/marca/`, { headers });
            const modalidadesResponse = await api.get<Modalidade[]>(`/modalidade/`, { headers });
            setMarcas(marcasResponse.data);
            setModalidades(modalidadesResponse.data);
        }
    }

    async function getBike() {
        await api.get<Bicicleta>(`/bicicleta/${id}/${donoId}`)
            .then((response) => {
                setFormState(response.data);
            })
            .catch((error) => {
                navigate("/")
            })
    }

    function updateForm(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {

        setFormState({
            ...formState,
            [e.target.name]:
                e.target.value
        })
    };

    useEffect(() => {
        getMarcasModalidades();
        getBike();

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                if (decodedToken.userId != donoId) {
                    navigate("/")
                }
            } catch (error) {
                console.error('Erro ao decodificar o token JWT:', error);
            }

        }
    }, [])

    const handleUpdate = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsButtonDisabled(true);
        if (tokenJson) {
            const tokenObject = JSON.parse(tokenJson);
            const headers = {
                Authorization: `${tokenObject}`,
            };
            await api.put(`/bicicleta/${id}`, formState, { headers })
                .then((response) => {
                    alert(response.data.message)
                    navigate(`/perfil/${formState.donoId}`);
                })
                .catch((error) => {
                    alert(error.response.data.error)
                })
                .finally(() => {
                    setIsButtonDisabled(false);
                });
        }
    };

    return (
        <div className='editarBike'>
            <header>
                <NavBar />
            </header>
            <main className='main-container'>
                <h1>Editar Bicicleta</h1>
                <Form className='d-flex flex-column gap-2' onSubmit={handleUpdate}>
                    <Form.Check
                        type="checkbox"
                        label="Alugada"
                        name="isAlugada"
                        checked={formState.isAlugada}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFormState({
                                ...formState,
                                isAlugada: e.target.checked,
                            })
                        }
                    />
                    <div className="d-flex gap-2">
                        <Form.Group controlId="formTamanho" className="col-md-6">
                            <Form.Label><span>Tamanho</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tamanho da bicicleta"
                                name="tamanho"
                                required
                                value={formState.tamanho}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCor" className="col-md-6">
                            <Form.Label><span>Cor</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cor da bicicleta"
                                name="cor"
                                required
                                value={formState.cor}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="d-flex gap-2">

                        <Form.Group controlId="formGenero" className="col-md-6">
                            <Form.Label className='d-flex align-items-center gap-2'><span>Genero</span></Form.Label>
                            <Form.Control
                                as="select"
                                name="generos"
                                required
                                value={formState.generos}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            >
                                <option value="">Selecione um gênero</option>
                                {Object.values(Generos).map((genero) => (
                                    <option key={genero} value={genero}>
                                        {genero}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formMarcha" className="col-md-6">
                            <Form.Label className='d-flex align-items-center gap-2'><span>Marchas</span></Form.Label>
                            <Form.Control
                                as="select"
                                name="marchas"
                                required
                                value={formState.marchas}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            >
                                <option value="">Quantidade de marchas</option>
                                {Object.values(Marchas).map((marcha) => (
                                    <option key={marcha} value={marcha}>
                                        {marcha}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="d-flex gap-2">
                        <Form.Group controlId="formAro" className="col-md-6">
                            <Form.Label className='d-flex align-items-center gap-2'><span>Aro</span></Form.Label>
                            <Form.Control
                                as="select"
                                name="aro"
                                required
                                value={formState.aro}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            >
                                <option value="">Tamanho do aro</option>
                                {Object.values(Aro).map((aro) => (
                                    <option key={aro} value={aro}>
                                        {aro}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formMaterial" className="col-md-6">
                            <Form.Label className='d-flex align-items-center gap-2'><span>Material</span></Form.Label>
                            <Form.Control
                                as="select"
                                name="material"
                                required
                                value={formState.material}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            >
                                <option value="">Material do quadro</option>
                                {Object.values(Material).map((material) => (
                                    <option key={material} value={material}>
                                        {material}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="d-flex gap-2">
                        <Form.Group controlId="formSuspensao" className="col-md-6">
                            <Form.Label className='d-flex align-items-center gap-2'><span>Suspensão</span></Form.Label>
                            <Form.Control
                                as="select"
                                name="suspensao"
                                required
                                value={formState.suspensao}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            >
                                <option value="">Selecione a suspensão</option>
                                {Object.values(Suspensao).map((suspensao) => (
                                    <option key={suspensao} value={suspensao}>
                                        {suspensao}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formMarca" className="col-md-6">
                            <Form.Label className='d-flex align-items-center gap-2'><span>Marca</span></Form.Label>
                            <Form.Control
                                as="select"
                                name="marcaId"
                                required
                                value={formState.marcaId}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            >
                                <option value="">Selecione a Marca</option>
                                {
                                    marcas && marcas.map((marca) => (
                                        <option key={marca.id} value={marca.id}>
                                            {marca.nome}
                                        </option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <Form.Group controlId="formModalidade">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Modalidade</span></Form.Label>
                        <Form.Control
                            as="select"
                            name="modalidadeId"
                            required
                            value={formState.modalidadeId}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        >
                            <option value="">Selecione a Modalidade</option>
                            {
                                modalidades && modalidades.map((modalidade) => (
                                    <option key={modalidade.id} value={modalidade.id}>
                                        {modalidade.nome}
                                    </option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <div className="d-flex gap-2">
                        <Form.Group controlId="formValorHora" className="col-md-6">
                            <Form.Label className='d-flex align-items-center gap-2'><span>Valor por Hora</span></Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Digite o valor por hora"
                                name="valorHora"
                                required
                                value={formState.valorHora}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formValorDia" className="col-md-6">
                            <Form.Label className='d-flex align-items-center gap-2'><span>Valor por Dia</span></Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Digite o valor por dia"
                                name="valorDia"
                                required
                                value={formState.valorDia}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </Form.Group>
                    </div>
                    <Form.Group controlId="formDescricao">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Descrição</span></Form.Label>
                        <textarea
                            className="form-control"
                            style={{ height: '100px' }}
                            placeholder="Digite a descrição da sua bike"
                            name="descricao"
                            required
                            value={formState.descricao}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateForm(e)}
                        />
                    </Form.Group>
                    <Button variant="primary" type='submit' className='mt-2' disabled={isButtonDisabled}>
                        Editar
                    </Button>
                </Form>
            </main>
        </div>
    );
};

export default EditarBikePage;
