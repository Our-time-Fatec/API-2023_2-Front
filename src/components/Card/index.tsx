import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

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
}

function CardBike({ id, marca, modalidade, foto, descricao, valorDia, valorHora, donoId, isProfile, isAlugada, isMyPerfil }: CardBike) {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${foto}`} style={{ height: '15rem', objectFit: 'cover', objectPosition: 'center' }} />
            <Card.Body>
                <span className={isAlugada ? "text-danger" : "text-success"}>{isAlugada ? "Alugada" : "Disponivel"}</span>
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
                <Card.Link className='disabled-link' as={Link} to={`#`}>
                    <Button variant="success" className='mt-2' disabled>
                        Ver Mais
                    </Button>
                </Card.Link >
                {!isProfile && isAuthenticated ? (<Card.Link as={Link} to={`/perfil/${donoId}`}>
                    <Button variant="primary" className='mt-2'>
                        Contato
                    </Button>
                </Card.Link >) : ""}
                {isMyPerfil && isAuthenticated ? (<Card.Link as={Link} to={`/perfil/${donoId}/bike/editar/${id}`}>
                    <Button variant="success" className='mt-2'>
                        Editar
                    </Button>
                </Card.Link >) : ""}
            </Card.Body>
        </Card>
    );
}

export default CardBike;