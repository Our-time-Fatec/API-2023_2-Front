import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import './style.css'
import api from '../../services/api';
import { useState } from 'react';
import { Rating, Box } from "@mui/material";
import { Star } from "@mui/icons-material"
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

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
    usuarioLogadoId?: number;
}

function CardBike({ id, marca, modalidade, foto, descricao, valorDia, valorHora, donoId, isProfile, isAlugada, isMyPerfil, usuarioLogadoId }: CardBike) {
    const isAuthenticated = !!localStorage.getItem('token');
    const tokenJson = localStorage.getItem('token');
    const handleSolicitarClick = async () => {
        if (tokenJson) {
            const tokenObject = JSON.parse(tokenJson);
            const headers = {
                Authorization: `${tokenObject}`,
            };
        try{
            const data = {
              idBicicleta: id,
              idLocador: donoId
            };
            const response = await api.post(`/solicitacao/create/`, data, {headers});
        if (response.status === 200) {
            alert("Solicitação enviada com sucesso!");
          } else {
            alert(`Erro ao enviar a solicitação: ${response.data.error}`);
          }
        }catch (error) {
          alert("Erro ao enviar a solicitação: Ocorreu um erro de rede ou exceção.");
          console.error("Erro ao enviar a solicitação:", error);
        }
      } else {
        alert("Você precisa fazer login para fazer uma solicitação.");
      }
    }
    const [value, setValue] = useState<number | null>(1)
    const [hover, setHover] = useState(-1)
    return (
        <Card className='card' style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`http://localhost:3001/images/${foto}`} style={{ height: '15rem', objectFit: 'cover', objectPosition: 'center' }} />
            <Card.Body>
                <span className={isAlugada ? "text-danger" : "text-success"}>{isAlugada ? "Alugada" : "Disponivel"}</span>
                <Card.Title>{marca} - {modalidade}</Card.Title>
                <Card.Text style={{ height: '3rem', overflowY: 'auto' }}>
                    {descricao}
                </Card.Text>
            </Card.Body>
            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems:'center',
                }}>
                <Rating
                    name='hover-feedback'
                    value={value}
                    precision={0.5}
                    onChange={(event, NewValue) => {
                        setValue(NewValue)
                    }}
                    onChangeActive={(event, newHover) =>{
                        setHover(newHover)
                    }}
                    emptyIcon={<Star style={{ opacity: 0.5}} fontSize='inherit'/>}
                />
            </Box>
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
                {!isAlugada && isAuthenticated && (donoId != usuarioLogadoId) ? (<Card.Link className='' as={Link} to={`/solicitacoesEnviadas`}>
                    <Button variant="dark" className='mt-1' onClick={handleSolicitarClick}>
                       Solicitar
                    </Button>
                </Card.Link >) : ""}
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