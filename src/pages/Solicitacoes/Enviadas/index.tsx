import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import NavBar from "../../../components/NavBar";
import api from "../../../services/api";
import Solicitacao from "../../../interfaces/Solicitacao";
import SolicitacaoCard from "../../../components/SolicitacaoCard";

function App() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

  async function getAllSolicit() {
    try {
      const response = await api.get<Solicitacao[]>("/solicitacao/");
      setSolicitacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
    }
  }

  useEffect(() => {
    getAllSolicit();

    const intervalId = setInterval(() => {
      getAllSolicit();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <NavBar />
      <div className="main-container">
        <div className="bike">
          {
            solicitacoes && solicitacoes.filter((i) => !i.isRespondido)
              .map((i) => {
                return (
                  <div key={i.idSolicitacao}>
                    <SolicitacaoCard idSolicitacao={i.idSolicitacao} idLocador={i.idLocador} idBicicleta={i.idBicicleta} />
                  </div>
                );
              })
          }
          {solicitacoes.length === 0 && <p>Sem solicitações disponíveis.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
