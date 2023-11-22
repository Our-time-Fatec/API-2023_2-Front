import DouH from "../Enums/DataHora";
import User from "./User";

interface Solicitacao {
    idSolicitacao: number;
    idLocador: number;
    idBicicleta: number;
    isRespondido?: boolean;
    isAceito?: boolean;
    DataouHora?: DouH;
    dono?: User;
}

export default Solicitacao;