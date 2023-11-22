import { useEffect, useState } from "react";
import CardBike from "../../components/Card";
import NavBar from "../../components/NavBar";
import Bicicleta from "../../interfaces/Bicicleta";
import api from "../../services/api";
import jwtDecode from "jwt-decode";
import DecodedToken from "../../interfaces/DecodedToken";
import { Sort } from "../../functions/bubble_sort";


function Inicio() {
    const [bicicletas, setBicicleta] = useState<Bicicleta[]>([]);
    const [userId, setUserId] = useState<number>();
    const sort = new Sort<Bicicleta>();


    async function getAllBikes() {
        const response = await api.get<Bicicleta[]>("/bicicleta/")
        const bikes = sort.bubble_naive_view(response.data)
        setBicicleta(bikes);
    }

    useEffect(() => {
        getAllBikes();

        const intervalId = setInterval(() => {
            getAllBikes();
        }, 60000);


        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                setUserId(parseInt(decodedToken.userId));
            } catch (error) {
                console.error('Erro ao decodificar o token JWT:', error);
            }
        }

    }, []);

    

    return (
        <div className="inicio">
            <NavBar />
            <main className="main-container inicio-container">
                <div className="d-flex flex-column align-items-center justify-content-center mt-3 gap-2">
                    <h1 className="text-green">Bicicletas disponiveis</h1>
                    <div className="bike mx-4 d-flex flex-wrap align-items-center justify-content-center gap-3 mt-3">
                        {
                            bicicletas && bicicletas.filter((i) => !i.isAlugada).map((i) => {
                                return (
                                    <div className="bike" key={i.id}>
                                        <CardBike id={i.id} marca={i.marca?.nome} modalidade={i.modalidade?.nome} foto={i.fotos && i.fotos[0]?.url} descricao={i.descricao} valorDia={i.valorDia} valorHora={i.valorHora} donoId={i.donoId} usuarioLogadoId={userId} />
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center mt-5 gap-2">
                    <h1 className="text-red">Bicicletas alugadas</h1>
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