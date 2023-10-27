import Estado from "./Estado";

interface Cidade {
    id: number;
    nome: string;
    microrregiao: {
        nome: string;
        mesorregiao: {
            nome: string;
            UF: Estado;
        }
    }
}
export default Cidade;