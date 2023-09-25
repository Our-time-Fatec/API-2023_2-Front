import { useNavigate } from 'react-router-dom';
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
import DecodedToken from '../../../interfaces/DecodedToken';
import jwtDecode from 'jwt-decode';

const CadastrarBikePage: React.FC = () => {
    const navigate = useNavigate();
    const tokenJson = localStorage.getItem('token');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modalidades, setModalidades] = useState<Marca[]>([]);
    const [imagem, setImagem] = useState<File | null>(null);
    const [bikeResponse, setBikeResponse] = useState({
        message: "",
        bikeId: 0
    })
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
        modalidadeId: 0
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

    function updateForm(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        setFormState({
            ...formState,
            [e.target.name]:
                e.target.value
        })
    };

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

    useEffect(() => {
        getMarcasModalidades();
    }, [])

    const handleCadastro = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsButtonDisabled(true);
        if (tokenJson) {
            const tokenObject = JSON.parse(tokenJson);
            const headers = {
                Authorization: `${tokenObject}`,
            };
            await api.post(`/bicicleta/`, formState, { headers })
                .then((response) => {
                    const message = response.data.message;
                    const bikeId = response.data.bikeId;
                    setBikeResponse({
                        message: message,
                        bikeId: bikeId
                    })
                    uploadImage(message, bikeId);
                })
                .catch((error) => {
                    alert(error.response.data.error)
                    setIsButtonDisabled(false);
                })
        }
    };

    const uploadImage = async (message: string, bikeId: number) => {
        const tokenObject = JSON.parse(tokenJson || '');
        const headers = {
            Authorization: `${tokenObject}`,
        };
        const decodedToken = jwtDecode<DecodedToken>(tokenJson || '');
        if (imagem && bikeId) {

            await api.post(`/foto/upload/`, {
                'file': imagem,
                'id_bike': bikeId
            }, {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    alert(message);
                    navigate(`/perfil/${decodedToken.userId}`);
                })
                .catch((error) => {
                    alert(error.response.data.error)
                })
                .finally(() => {
                    setIsButtonDisabled(false);
                });
        }
    }

    return (
        <div className='cadastrarBike'>
            <header>
                <NavBar />
            </header>
            <main className='main-container'>
                <Form onSubmit={handleCadastro}>
                    <Form.Group controlId="formTamanho">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Tamanho</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o tamanho da sua bike"
                            name="tamanho"
                            required
                            value={formState.tamanho}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCor">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Cor</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a cor da sua bike"
                            name="cor"
                            required
                            value={formState.cor}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGenero">
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
                    <Form.Group controlId="formMarcha">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Marchas</span></Form.Label>
                        <Form.Control
                            as="select"
                            name="marchas"
                            required
                            value={formState.marchas}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        >
                            <option value="">Selecione a quantidade de marchas</option>
                            {Object.values(Marchas).map((marcha) => (
                                <option key={marcha} value={marcha}>
                                    {marcha}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formAro">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Aro</span></Form.Label>
                        <Form.Control
                            as="select"
                            name="aro"
                            required
                            value={formState.aro}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        >
                            <option value="">Selecione o aro da bicicleta</option>
                            {Object.values(Aro).map((aro) => (
                                <option key={aro} value={aro}>
                                    {aro}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formMaterial">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Material</span></Form.Label>
                        <Form.Control
                            as="select"
                            name="material"
                            required
                            value={formState.material}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        >
                            <option value="">Selecione o material</option>
                            {Object.values(Material).map((material) => (
                                <option key={material} value={material}>
                                    {material}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formSuspensao">
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
                    <Form.Group controlId="formMarca">
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
                    <Form.Group controlId="formValorHora">
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
                    <Form.Group controlId="formValorDia">
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
                    <Form.Group controlId="formDescricao">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Descrição</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a descrição da sua bike"
                            name="descricao"
                            required
                            value={formState.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFoto">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Foto</span></Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Insira a imagem principal da sua bicicleta"
                            name="foto"
                            required
                            accept="image/*"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageChange(e)}
                        />
                    </Form.Group>
                    <Button variant="primary" type='submit' className='mt-2' disabled={isButtonDisabled}>
                        Cadastrar Bike
                    </Button>
                </Form>
            </main>
        </div>
    );
};

export default CadastrarBikePage;
