interface SoliCard {
    idSolicitacao: number;
    idLocador: number;
    idBicicleta: number;
    isRespondido?: boolean;
    isAceito?: boolean;
    DataouHora?: Date;
}

function SolicitacaoCard({ idSolicitacao, idLocador, idBicicleta, isRespondido, isAceito, DataouHora }: SoliCard) {
    return (
        <div className="card-bike">
            <div className="card-title roboto-negrito text-black">Solicitação: {idSolicitacao}</div>
            <span className="text-black roboto-regular">Locatário: {idLocador}</span><br></br>
            <span className="text-black roboto-regular">Bicicleta: {idBicicleta}</span><br></br>
            <p className="text-green">Aguardando resposta </p>
        </div>
    );
}

export default SolicitacaoCard