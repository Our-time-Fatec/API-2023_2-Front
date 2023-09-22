import { useEffect, useState } from "react";
import CardBike from "../../components/Card";
import NavBar from "../../components/NavBar";
import Bicicleta from "../../interfaces/Bicicleta";
import api from "../../services/api";

function Inicio() {
    const [bicicletas, setBicicleta] = useState<Bicicleta[]>([]);

    async function getAllBikes() {
        const response = await api.get<Bicicleta[]>("/bicicleta/")
        setBicicleta(response.data);
    }

    useEffect(() => {
        getAllBikes();

        const intervalId = setInterval(() => {
            getAllBikes();
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="inicio">
            <header>
                <NavBar />
            </header>
            <main className="main-container">
                <h1 className="mt-3">Bicicletas disponiveis</h1>
                <div className="bike mx-4 d-flex flex-wrap gap-2">
                    {
                        bicicletas && bicicletas.map((i) => {
                            return (

                                <div className="bike" key={i.id}>
                                    <CardBike marca={i.marca?.nome} modalidade={i.modalidade?.nome} foto={i.fotos && i.fotos[0]?.url} descricao={i.descricao} valorDia={i.valorDia} valorHora={i.valorHora} donoId={i.donoId} />
                                </div>

                            )
                        })
                    }
                </div>
            </main>
        </div>
    )
}
export default Inicio;