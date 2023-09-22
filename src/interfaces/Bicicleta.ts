import Aro from "../Enums/Aro";
import Generos from "../Enums/Genero";
import Marchas from "../Enums/Marcha";
import Material from "../Enums/Material";
import Suspensao from "../Enums/Suspensao";
import Foto from "./Foto";
import Marca from "./Marca";
import Modalidade from "./Modalidade";
import User from "./User";

interface Bicicleta {
    id?: number;
    tamanho: string;
    cor: string;
    generos: Generos;
    marchas: Marchas;
    aro: Aro;
    material: Material;
    suspensao: Suspensao;
    descricao: string;
    valorHora: number;
    valorDia: number;
    isAlugada?: boolean;
    marcaId: number;
    modalidadeId: number;
    donoId?: number;
    avaliacao?: number;
    marca?: Marca;
    modalidade?: Modalidade;
    dono?: User;
    fotos?: Foto[];
    createdAt?: string;
    updatedAt?: string;
}


export default Bicicleta;
