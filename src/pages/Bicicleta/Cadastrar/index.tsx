import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { FaUser, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail, MdCall } from 'react-icons/md'
import api from '../../../services/api';
import NavBar from '../../../components/NavBar';
import Generos from '../../../Enums/Genero';
import User from '../../../interfaces/User';
import Bicicleta from '../../../interfaces/Bicicleta';
import Marchas from '../../../Enums/Marcha';
import Aro from '../../../Enums/Aro';
import Material from '../../../Enums/Material';
import Suspensao from '../../../Enums/Suspensao';

const CadastrarBikePage: React.FC = () => {

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

    function updateForm(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        setFormState({
            ...formState,
            [e.target.name]:
                e.target.value
        })
    };


    return (
        <div className='cadastrarBike'>
            <header>
                <NavBar />
            </header>
            <main className='main-container'>
                <Form>
                    <Form.Group controlId="formGenero">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Genero</span></Form.Label>
                        <Form.Control
                            as="select"
                            name="generos"
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
                    <Form.Group controlId="formMaterial">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Material</span></Form.Label>
                        <Form.Control
                            as="select"
                            name="material"
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
                            name="marca"
                            value={formState.marcaId}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        >
                            <option value="">Selecione a Marca</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formModalidade">
                        <Form.Label className='d-flex align-items-center gap-2'><span>Modalidade</span></Form.Label>
                        <Form.Control
                            as="select"
                            name="modalidade"
                            value={formState.modalidadeId}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        >
                            <option value="">Selecione a Modalidade</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type='submit' className='mt-2'>
                        Cadastrar Bike
                    </Button>
                </Form>
            </main>
        </div>
    );
};

export default CadastrarBikePage;
