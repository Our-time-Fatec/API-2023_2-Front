import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import api from '../../services/api';

interface CardBike{
    marca: string;
    modalidade: string;
    foto: string;
    descricao: string;
    valorDia: number;
    valorHora: number;
}

function CardBike({marca, modalidade, foto, descricao, valorDia, valorHora }:CardBike) {
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
        <Card.Link href="#">Contato</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default CardBike;