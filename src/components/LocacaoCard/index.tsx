import Bicicleta from "../../interfaces/Bicicleta";
import User from "../../interfaces/User";

interface LocacaoCard {
    id: number;
    isAtivo: boolean;
    idLocatario: number;
    idBicicleta: number;
    avaliacaoDono: number;
    bicicleta: Bicicleta;
    locatario: User;
}

function LocacaoCard({ id, isAtivo, idLocatario, idBicicleta, avaliacaoDono, bicicleta, locatario }: LocacaoCard) {

    return (
        <div className="locacao-card">
            <div className="card-bike roboto-regular text-black d-flex flex-column">
                <div className="card-title roboto-negrito">Locação: {id}</div>
                {isAtivo ? <span className="text-green">Ativa</span> : <span className="text-red">Encerrada</span>}
                <span>Locatário: {locatario.username}</span>
                <span>Bicicleta: {bicicleta.marca?.nome} - {bicicleta.modalidade?.nome}</span>
                <span>Dono: {bicicleta.dono?.username}</span>
            </div>
        </div>
    )
}

export default LocacaoCard;