import Bicicleta from "./Bicicleta";
import User from "./User";

interface Locacao {
    id: number;
    isAtivo: boolean;
    idLocatario: number;
    idBicicleta: number;
    avaliacaoDono: number;
    bicicleta: Bicicleta;
    locatario: User;
}

export default Locacao