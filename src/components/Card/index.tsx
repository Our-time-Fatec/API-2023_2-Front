import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

interface CardBike {
    marca: string;
    modalidade: string;
    foto: string;
    descricao: string;
    valorDia: number;
    valorHora: number;
    donoId: number;
    isProfile?: boolean;
}

function CardBike({ marca, modalidade, foto, descricao, valorDia, valorHora, donoId, isProfile }: CardBike) {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`http://localhost:3001/images/${foto}`} />
            <Card.Body>
                <Card.Title>{marca} - {modalidade} </Card.Title>
                <Card.Text>
                    {descricao}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Valor por dia: R$ {valorDia}</ListGroup.Item>
                <ListGroup.Item>Valor por hora: R$ {valorHora}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Ver Mais</Card.Link>
                {!isProfile && isAuthenticated ? (<Card.Link as={Link} to={`/perfil/${donoId}`}>Contato</Card.Link>) : ""}
                
            </Card.Body>
        </Card>
    );
}

export default CardBike;