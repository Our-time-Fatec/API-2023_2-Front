import { useEffect, useState } from "react"
import LocacaoCard from "../../../components/LocacaoCard"
import NavBar from "../../../components/NavBar"
import Locacao from "../../../interfaces/Locacao"
import DecodedToken from "../../../interfaces/DecodedToken"
import api from "../../../services/api"
import jwtDecode from "jwt-decode"

function LocacoesLocadas() {
    const [locacoes, setLocacoes] = useState<Locacao[]>([])

    async function getAllLocacoes() {
        try {
            const tokenJson = localStorage.getItem('token');
            if (tokenJson) {
                const tokenObject = JSON.parse(tokenJson);
                const decodedToken = jwtDecode<DecodedToken>(tokenJson);
                const idLocador = (parseInt(decodedToken.userId));
                const headers = {
                    Authorization: `${tokenObject}`,
                };

                const response = await api.get<Locacao[]>(`/locacao/Locadas/${idLocador}`, { headers });
                setLocacoes(response.data);
            }

        } catch (error) {
            console.error("Erro ao buscar locações:", error);
        }
    }

    useEffect(() => {
        getAllLocacoes();

        const intervalId = setInterval(() => {
            getAllLocacoes();
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="locacoes-locadas">
            <NavBar />
            <main className="main-container roboto-regular">
                <h1 className="roboto-negrito ">Locações Locadas</h1>
                <div className="d-flex flex-column align-items-center">
                    <h2 className="text-green">Locações Ativas</h2>
                    <div className="locacoes d-flex flex-wrap mt-5 gap-2 align-items-center justify-content-center">
                        {
                            locacoes.some((i) => i.isAtivo) ?
                                (locacoes.filter((i) => i.isAtivo)
                                    .map((i) => (
                                        <div key={i.id}>
                                            <LocacaoCard
                                                id={i.id}
                                                isAtivo={i.isAtivo}
                                                idLocatario={i.idLocatario}
                                                idBicicleta={i.idBicicleta}
                                                avaliacaoDono={i.avaliacaoDono}
                                                bicicleta={i.bicicleta}
                                                locatario={i.locatario}
                                            />
                                        </div>
                                    ))
                                ) :
                                (
                                    <p>Sem locações locadas ativas.</p>
                                )
                        }
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <h2 className="text-red">Locações Encerradas</h2>
                    <div className="locacoes d-flex flex-wrap mt-5 gap-2 align-items-center justify-content-center">
                        {
                            locacoes.some((i) => !i.isAtivo) ?
                                (locacoes.filter((i) => !i.isAtivo)
                                    .map((i) => (
                                        <div key={i.id}>
                                            <LocacaoCard
                                                id={i.id}
                                                isAtivo={i.isAtivo}
                                                idLocatario={i.idLocatario}
                                                idBicicleta={i.idBicicleta}
                                                avaliacaoDono={i.avaliacaoDono}
                                                bicicleta={i.bicicleta}
                                                locatario={i.locatario}
                                            />
                                        </div>
                                    ))
                                ) :
                                (
                                    <p>Sem locações locadas encerradas.</p>
                                )
                        }
                    </div>
                </div>
            </main>
        </div>
    )

}


export default LocacoesLocadas
