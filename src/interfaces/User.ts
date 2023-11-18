import Bicicleta from "./Bicicleta";

interface User {
    id?: number;
    googleID?: string;
    imageUser?: string; 
    username: string;
    email: string;
    password?: string;
    telefone: string;
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    logradouro: string;
    numero_casa: number;
    longitude?: number;
    latitude?: number;
    isAlugando?: boolean;
    avaliacaoBikes?: number;
    avaliacaoLocacoes?: number;
    createdAt?: string;
    updatedAt?: string;
    bicicletas?: Bicicleta[];
}

export default User;