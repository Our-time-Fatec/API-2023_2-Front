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
            <main>
                <h1>Bicicletas disponiveis</h1>
                <div className="bike mx-4 d-flex gap-2">
                    {/* <CardBike marca={"Caloi"} modalidade={"MTB"} foto={"https://images.tcdn.com.br/img/img_prod/909210/bicicleta_caloi_explorer_20_azul_6535_1_8d5c2b4ac83fe87e5d525ca1299fea4d.jpg"} descricao={"Moutain bike para trilhas "} valorDia={250} valorHora={10} /> */}
                    {
                        bicicletas && bicicletas.map((i) => {
                            return (

                                <div className="bike" key={i.id}>
                                    <CardBike marca={i.marca.nome} modalidade={i.modalidade.nome} foto={i.fotos[0]?.url} descricao={i.descricao} valorDia={i.valorDia} valorHora={i.valorHora} />
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