import { Button } from "react-bootstrap";
import DiaouHora from "../../Enums/DiaouHora";
import Bicicleta from "../../interfaces/Bicicleta";
import User from "../../interfaces/User";

interface SoliCard {
    idSolicitacao: number;
    idLocatario: number;
    idBicicleta: number;
    isRespondido?: boolean;
    isAceito?: boolean;
    DiaouHora?: DiaouHora;
    bicicleta?: Bicicleta;
    locatario?: User;
}

function SolicitacaoCard({ idSolicitacao, idLocatario, idBicicleta, isRespondido, isAceito, DiaouHora, locatario, bicicleta }: SoliCard) {

    const acceptSolicitacao = async () => {
        alert('Solicitação aceita')
    }

    const rejectSolicitacao = async () => {
        alert('Solicitação Rejeitada')
    }

    return (
        <div className="card-bike">
            <div className="card-title roboto-negrito text-black">Solicitação: {idSolicitacao}</div>
            <p className="text-green">Aguardando resposta </p>
            <span className="text-black roboto-regular">Locatário: {locatario?.username}</span><br></br>
            <span className="text-black roboto-regular">Bicicleta: {bicicleta?.marca?.nome} - {bicicleta?.modalidade?.nome}</span><br></br>
            <span className="text-black roboto-regular">Tipo De Solicitacao: {DiaouHora}</span><br></br>
            <div className="d-flex gap-2">
                <Button variant="primary" className='mt-2' onClick={acceptSolicitacao}>
                    Aceitar
                </Button>
                <Button variant="danger" className='mt-2' onClick={rejectSolicitacao}>
                    Rejeitar
                </Button>
            </div>
        </div>
    );
}

export default SolicitacaoCard