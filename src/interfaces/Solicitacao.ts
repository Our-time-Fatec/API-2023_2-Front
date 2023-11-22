import DouH from "../Enums/DataHora";
import User from "./User";

interface Solicitacao {
    idSolicitacao: number;
    idLocatario: number;
    idBicicleta: number;
    isRespondido?: boolean;
    isAceito?: boolean;
    DataouHora?: DouH;
    dono?: User;
}

export default Solicitacao;