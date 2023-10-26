import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../../components/NavBar';
import api from '../../../services/api';
import Bicicleta from '../../../interfaces/Bicicleta';
import Aro from '../../../Enums/Aro';
import Generos from '../../../Enums/Genero';
import Marchas from '../../../Enums/Marcha';
import Material from '../../../Enums/Material';
import Suspensao from '../../../Enums/Suspensao';
import Marca from '../../../interfaces/Marca';
import Modalidade from '../../../interfaces/Modalidade';
import { Button } from 'react-bootstrap';
import './style.css';


const marcaPadrao: Marca = {
    id: 0,
    nome: ""
}

const modalidadePadrao: Modalidade = {
    id: 0,
    nome: ""
}

const VisualizarBike: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isAuthenticated = !!localStorage.getItem('token');
    const tokenJson = localStorage.getItem('token');
    const [bicicleta, setBicicleta] = useState<Bicicleta>({
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
        isAlugada: false,
        marca: marcaPadrao,
        modalidade: modalidadePadrao,
    });

    async function getBike() {
        await api.get<Bicicleta>(`/bicicleta/${id}`)
            .then((response) => {
                setBicicleta(response.data);
            })
            .catch((error) => {
                navigate("/")
            })
    }

    const formatPhoneNumber = (phoneNumber: string) => {
        const numericPhone = phoneNumber.replace(/\D/g, '');
        const formattedPhone = numericPhone.startsWith('55') ? numericPhone : `55${numericPhone}`;
        return formattedPhone;
    };

    useEffect(() => {
        getBike();
    }, [])

    const formattedPhoneNumber = bicicleta?.dono?.telefone ? formatPhoneNumber(bicicleta?.dono?.telefone) : '';
    const whatsappLink = `https://wa.me/${formattedPhoneNumber}`;

    return (
        <div>
            <NavBar />
            <main className='main-container'>
                <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                    <div className="d-flex flex-column gap-2 img-bike" style={{ width: '20rem' }}>
                        <img src={`http://localhost:3001/images/${bicicleta.fotos && bicicleta.fotos[0]?.url}`} style={{ height: '22rem', objectFit: 'cover', objectPosition: 'center' }} />
                    </div>
                    <div className="d-flex flex-column gap-2 info-bikes">
                        <span><strong>Marca: </strong>{bicicleta?.marca?.nome}</span>
                        <span><strong>Modalidade: </strong>{bicicleta?.modalidade?.nome}</span>
                        <span><strong>Tamanho: </strong>{bicicleta?.tamanho}</span>
                        <span><strong>Cor: </strong>{bicicleta?.cor}</span>
                        <span><strong>Genêro: </strong>{bicicleta?.generos}</span>
                        <span><strong>Aro: </strong>{bicicleta?.aro}</span>
                        <span><strong>Marcha: </strong>{bicicleta?.marchas}</span>
                        <span><strong>Suspensão: </strong>{bicicleta?.suspensao}</span>
                        <span><strong>Material: </strong>{bicicleta?.material}</span>
                        <div className="d-flex gap-3">
                            <span><strong>Valor por Hora: </strong>{bicicleta?.valorHora}</span>
                            <span><strong>Valor por Dia: </strong>{bicicleta?.valorDia}</span>
                        </div>
                        <span><strong>Descrição: </strong>{bicicleta?.descricao}</span>
                    </div>
                </div>
                <div className="d-flex gap-2 mt-3">
    <span><strong>Dono: </strong>{bicicleta.dono?.username}</span>
</div>
<div className="d-flex gap-2">
    <span><strong>Status: </strong></span>
    <span className={bicicleta?.isAlugada ? "text-danger" : "text-success"}>{bicicleta?.isAlugada ? "Alugada" : "Disponivel"}</span>
</div>

                {isAuthenticated ? (<Link className='mt-2' to={`/perfil/${bicicleta?.donoId}`}>
                    <Button variant="dark" >
                        Contato
                    </Button>
                </Link >) : ""}
            </main>
        </div>
    );
};

export default VisualizarBike;
