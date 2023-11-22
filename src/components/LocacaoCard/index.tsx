import { Button, Form, Modal } from "react-bootstrap";
import Bicicleta from "../../interfaces/Bicicleta";
import User from "../../interfaces/User";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

interface LocacaoCard {
    id: number;
    isAtivo: boolean;
    isBikeDevolvida: boolean;
    idLocatario: number;
    idBicicleta: number;
    avaliacaoDono: number;
    bicicleta: Bicicleta;
    locatario: User;
    isLocacoesAlugadas?: boolean;
    isLocacoesLocadas?: boolean
}

function LocacaoCard({ id, isAtivo, isBikeDevolvida, idLocatario, idBicicleta, avaliacaoDono, bicicleta, locatario, isLocacoesLocadas, isLocacoesAlugadas }: LocacaoCard) {
    const tokenJson = localStorage.getItem('token');
    const navigate = useNavigate();
    const [avaliacao, setAvaliacao] = useState<number>();
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAvaliacaoChange = (e: React.ChangeEvent<any>) => {
        setAvaliacao(e.target.value);
    };

    const renderAvaliacaoOptions = (start: number, end: number, step: number) => {
        const options: JSX.Element[] = [];
        for (let value = start; value <= end; value += step) {
            options.push(
                <option key={value} value={value.toString()}>
                    {value}
                </option>
            );
        }
        return options;
    };

    const encerrarLocacao = async (idLocacao: number) => {
        if (tokenJson) {
            const tokenObject = JSON.parse(tokenJson);
            const headers = {
                Authorization: `${tokenObject}`,
            };

            await api.put(`/locacao/Encerrar/${idLocacao}`, avaliacao, { headers })
                .then((response) => {
                    alert(response.data.message)
                    navigate(0)
                })
                .catch((error) => {
                    alert(error.response.data.error)
                })

        } else {
            alert("Você precisa fazer login para fazer uma solicitação.");
        }
    }
    return (
        <div className="locacao-card">
            <div className="card-bike roboto-regular text-black d-flex flex-column">
                <div className="card-title roboto-negrito">Locação: {id}</div>
                {isAtivo ? (isBikeDevolvida ? <span className="text-green">{isLocacoesAlugadas ? "Aguardando retorno do Locador" : "Necessário confirmar pagamento de locação!"}</span> : <span className="text-green">Ativa</span>) : <span className="text-red">Encerrada</span>}
                <span>Locatário: {locatario.username}</span>
                <span>Bicicleta: {bicicleta.marca?.nome} - {bicicleta.modalidade?.nome}</span>
                <span>Dono: {bicicleta.dono?.username}</span>
                {
                    isLocacoesAlugadas && !isBikeDevolvida ? (
                        <div className="d-flex gap-2">
                            <Button variant="primary" className='mt-2' onClick={handleShowModal}>
                                Encerrar Locação
                            </Button>
                        </div>
                    )
                        : ""
                }
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Qual opção você deseja solicitar?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        as="select"
                        name="avaliacao"
                        required
                        value={avaliacao}
                        onChange={handleAvaliacaoChange}
                    >
                        {renderAvaliacaoOptions(1, 5, 0.5)}
                    </Form.Control>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={() => encerrarLocacao(id)} >
                        Encerrar Locação
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default LocacaoCard;
