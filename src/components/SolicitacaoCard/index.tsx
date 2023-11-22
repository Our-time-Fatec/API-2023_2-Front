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
    return (
        <div className="card-bike">
            <div className="card-title roboto-negrito text-black">Solicitação: {idSolicitacao}</div>
            <span className="text-black roboto-regular">Locatário: {locatario?.username}</span><br></br>
            <span className="text-black roboto-regular">Bicicleta: {bicicleta?.marca?.nome} - {bicicleta?.modalidade?.nome}</span><br></br>
            <span className="text-black roboto-regular">Tipo De Solicitacao: {DiaouHora}</span><br></br>
            <p className="text-green">Aguardando resposta </p>
        </div>
    );
}

export default SolicitacaoCard