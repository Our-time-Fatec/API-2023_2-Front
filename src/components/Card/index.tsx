import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import './style.css'
import api from '../../services/api';
import jwtDecode from 'jwt-decode';
import DecodedToken from '../../interfaces/DecodedToken';

interface CardBike {
    id?: number;
    marca?: string;
    modalidade?: string;
    foto?: string;
    descricao: string;
    valorDia: number;
    valorHora: number;
    donoId?: number;
    isProfile?: boolean;
    isAlugada?: boolean;
    isMyPerfil?: boolean;
    avaliacao?: number;
    usuarioLogadoId?: number;
}

function CardBike({ id, marca, modalidade, foto, descricao, valorDia, valorHora, donoId, isProfile, isAlugada, isMyPerfil, usuarioLogadoId, avaliacao }: CardBike) {
    const isAuthenticated = !!localStorage.getItem('token');
    const tokenJson = localStorage.getItem('token');

    // const handleSolicitarClick = async () => {
    //     if (tokenJson) {
    //         const tokenObject = JSON.parse(tokenJson);
    //         const headers = {
    //             Authorization: `${tokenObject}`,
    //         };
    //         const decodedToken = jwtDecode<DecodedToken>(tokenJson);
    //         const idLocatario = (parseInt(decodedToken.userId));
    //         try {
    //             const data = {
    //                 idBicicleta: id,
    //                 idLocatario: idLocatario
    //             };
    //             const response = await api.post(`/solicitacao/create/`, data, { headers });
    //             if (response.status === 200) {
    //                 alert("Solicitação enviada com sucesso!");
    //             } else {
    //                 alert(`Erro ao enviar a solicitação: ${response.data.error}`);
    //             }
    //         } catch (error) {
    //             alert("Erro ao enviar a solicitação: Ocorreu um erro de rede ou exceção.");
    //             console.error("Erro ao enviar a solicitação:", error);
    //         }
    //     } else {
    //         alert("Você precisa fazer login para fazer uma solicitação.");
    //     }
    // }
    return (
        <Card className='card' style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${foto}`} style={{ height: '15rem', objectFit: 'cover', objectPosition: 'center' }} />
            <Card.Body>
                <span className={isAlugada ? "text-danger" : "text-success"}>{isAlugada ? "Alugada" : "Disponivel"}</span><br></br>
                <span className='roboto-negrito'>Avaliação: {avaliacao}</span>
                <Card.Title>{marca} - {modalidade}</Card.Title>
                <Card.Text style={{ height: '3rem', overflowY: 'auto' }}>
                    {descricao}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Valor por dia: R$ {valorDia}</ListGroup.Item>
                <ListGroup.Item>Valor por hora: R$ {valorHora}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link className='' as={Link} to={`/bike/${id}`}>
                    <Button variant="dark" className='mt-1'>
                        Ver Mais
                    </Button>
                </Card.Link >
                {!isProfile && isAuthenticated ? (<Card.Link as={Link} to={`/perfil/${donoId}`}>
                    <Button variant="dark" className='mt-1'>
                        Contato
                    </Button>
                </Card.Link >) : ""}
                {/* {!isAlugada && isAuthenticated && (donoId != usuarioLogadoId) ? (<Card.Link className='' as={Link} to={`/solicitacoesEnviadas`}>
                    <Button variant="dark" className='mt-1' onClick={handleSolicitarClick}>
                        Solicitar
                    </Button>
                </Card.Link >) : ""} */}
                {isMyPerfil && isAuthenticated ? (<Card.Link as={Link} to={`/perfil/${donoId}/bike/editar/${id}`}>
                    <Button variant="dark" className='mt-2'>
                        Editar
                    </Button>
                </Card.Link >) : ""}
            </Card.Body>
        </Card>
    );
}
export default CardBike;