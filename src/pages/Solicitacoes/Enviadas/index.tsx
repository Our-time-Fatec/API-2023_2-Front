import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import NavBar from "../../../components/NavBar";
import api from "../../../services/api";
import Solicitacao from "../../../interfaces/Solicitacao";
import SolicitacaoCard from "../../../components/SolicitacaoCard";
import jwtDecode from "jwt-decode";
import DecodedToken from "../../../interfaces/DecodedToken";

function SolicitacoesEnviadas() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

  async function getAllSolicit() {
    try {
      const tokenJson = localStorage.getItem('token');
      if (tokenJson) {
        const tokenObject = JSON.parse(tokenJson);
        const decodedToken = jwtDecode<DecodedToken>(tokenJson);
        const idLocatario = (parseInt(decodedToken.userId));
        const headers = {
          Authorization: `${tokenObject}`,
        };

        const response = await api.get<Solicitacao[]>(`/solicitacao/Enviadas/${idLocatario}`, { headers });
        setSolicitacoes(response.data);
      }

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
    <div className="solicitacoes-enviadas">
      <NavBar />
      <main className="main-container">
        <div className="bike">
          {
            solicitacoes && solicitacoes.filter((i) => !i.isRespondido)
              .map((i) => {
                return (
                  <div key={i.idSolicitacao}>
                    <SolicitacaoCard idSolicitacao={i.idSolicitacao} idLocatario={i.idLocatario} idBicicleta={i.idBicicleta} DiaouHora={i.DiaouHora} />
                  </div>
                );
              })
          }
          {solicitacoes.length === 0 && <p>Sem solicitações disponíveis.</p>}
        </div>
      </main>
    </div>
  );
}

export default SolicitacoesEnviadas;
