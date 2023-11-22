import DouH from "../Enums/DiaouHora";
import User from "./User";

interface Solicitacao {
    idSolicitacao: number;
    idLocatario: number;
    idBicicleta: number;
    isRespondido?: boolean;
    isAceito?: boolean;
    DiaouHora?: DouH;
    dono?: User;
}

export default Solicitacao;