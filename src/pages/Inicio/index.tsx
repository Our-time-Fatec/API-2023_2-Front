import { useEffect, useState } from "react";
import CardBike from "../../components/Card";
import NavBar from "../../components/NavBar";
import Bicicleta from "../../interfaces/Bicicleta";
import api from "../../services/api";
import "./style.css";

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
            <header className="header-container">
                <NavBar />
            </header>
            <main className="main-container inicio-container">
                <div className="d-flex flex-column align-items-center justify-content-center mt-3 gap-2">
                    <h1 className="text-success">Bicicletas disponiveis</h1>
                    <div className="bike mx-4 d-flex flex-wrap align-items-center justify-content-center gap-3 mt-3">
                        {
                            bicicletas && bicicletas.filter((i) => !i.isAlugada).map((i) => {
                                return (
                                    <div className="bike" key={i.id}>
                                        <CardBike id={i.id} marca={i.marca?.nome} modalidade={i.modalidade?.nome} foto={i.fotos && i.fotos[0]?.url} descricao={i.descricao} valorDia={i.valorDia} valorHora={i.valorHora} donoId={i.donoId} />
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center mt-5 gap-2">
                    <h1 className="text-danger">Bicicletas alugadas</h1>
                    <div className="bike mx-4 d-flex flex-wrap align-items-center justify-content-center gap-3 mt-3">
                        {
                            bicicletas && bicicletas.filter((i) => i.isAlugada).map((i) => {
                                return (

                                    <div className="bike" key={i.id}>
                                        <CardBike id={i.id} marca={i.marca?.nome} modalidade={i.modalidade?.nome} foto={i.fotos && i.fotos[0]?.url} descricao={i.descricao} valorDia={i.valorDia} valorHora={i.valorHora} donoId={i.donoId} isAlugada={i.isAlugada} />
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Inicio;