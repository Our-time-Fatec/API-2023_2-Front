import Regiao from "./Regiao";

interface Estado {
    id: number;
    sigla: string;
    nome: string;
    regiao: Regiao;
}
export default Estado;