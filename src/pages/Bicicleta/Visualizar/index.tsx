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
import jwtDecode from 'jwt-decode';
import DecodedToken from '../../../interfaces/DecodedToken';


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
    const [userId, setUserId] = useState<number>();
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
        if (tokenJson) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(tokenJson);
                setUserId(parseInt(decodedToken.userId));
            } catch (error) {
                console.error('Erro ao decodificar o token JWT:', error);
            }
        }
    }, [])

    const handleSolicitarClick = async () => {
        if (tokenJson) {
            const tokenObject = JSON.parse(tokenJson);
            const headers = {
                Authorization: `${tokenObject}`,
            };
            const decodedToken = jwtDecode<DecodedToken>(tokenJson);
            const idLocatario = (parseInt(decodedToken.userId));
            const data = {
                idBicicleta: id,
                idLocatario: idLocatario
            };
            await api.post(`/solicitacao/create/`, data, { headers })
                .then((response) => {
                    alert(response.data.message)
                    navigate("/solicitacoesEnviadas")
                })
                .catch((error) => {
                    alert(error.response.data.error)
                })
        } else {
            alert("Você precisa fazer login para fazer uma solicitação.");
        }
    }

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
                    <span className={bicicleta?.isAlugada ? "text-red" : "text-green"}>{bicicleta?.isAlugada ? "Alugada" : "Disponivel"}</span>
                </div>

                <div className="d-flex gap-2 mt-2">
                    {isAuthenticated ? (<Link className='' to={`/perfil/${bicicleta?.donoId}`}>
                        <Button variant="dark" >
                            Contato
                        </Button>
                    </Link >) : ""}
                    {!bicicleta?.isAlugada && isAuthenticated && (bicicleta?.donoId != userId) ? (
                        <Button variant="dark" onClick={handleSolicitarClick}>
                            Solicitar
                        </Button>) : ""}
                </div>
            </main>
        </div>
    );
};

export default VisualizarBike;
