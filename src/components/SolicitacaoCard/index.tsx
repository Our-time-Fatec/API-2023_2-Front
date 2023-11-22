import DiaouHora from "../../Enums/DiaouHora";

interface SoliCard {
    idSolicitacao: number;
    idLocatario: number;
    idBicicleta: number;
    isRespondido?: boolean;
    isAceito?: boolean;
    DiaouHora?: DiaouHora;
}

function SolicitacaoCard({ idSolicitacao, idLocatario, idBicicleta, isRespondido, isAceito, DiaouHora }: SoliCard) {
    return (
        <div className="card-bike">
            <div className="card-title roboto-negrito text-black">Solicitação: {idSolicitacao}</div>
            <span className="text-black roboto-regular">Locatário: {idLocatario}</span><br></br>
            <span className="text-black roboto-regular">Bicicleta: {idBicicleta}</span><br></br>
            <span className="text-black roboto-regular">Tipo De Solicitacao: {DiaouHora}</span><br></br>
            <p className="text-green">Aguardando resposta </p>
        </div>
    );
}

export default SolicitacaoCard