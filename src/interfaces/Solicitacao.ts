import DouH from "../Enums/DiaouHora";
import Bicicleta from "./Bicicleta";
import User from "./User";

interface Solicitacao {
    idSolicitacao: number;
    idLocatario: number;
    idBicicleta: number;
    isRespondido?: boolean;
    isAceito?: boolean;
    DiaouHora?: DouH;
    locatario?: User;
    bicicleta?: Bicicleta;
}

export default Solicitacao;