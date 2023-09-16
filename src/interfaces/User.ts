import Bicicleta from "./Bicicleta";

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    telefone: string;
    endereco: string;
    longitude: number;
    latitude: number;
    isAlugando: boolean;
    avaliacaoBikes: number;
    avaliacaoLocacoes: number;
    createdAt: string;
    updatedAt: string;
    bicicletas: Bicicleta[];
}

export default User;