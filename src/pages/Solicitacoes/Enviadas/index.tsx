import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import NavBar from "../../../components/NavBar";
import api from "../../../services/api";
import Solicitacao from "../../../interfaces/Solicitacao";

const SoliCard = (props: {title:string}) => {
  return (
    <div className="card-bike">
      <div className="card-title">{props.title}</div>
      <button className="btn-Aceitar">Aceitar</button>
      <button className="btn-Recusar">Recusar</button>
    </div>
  );
};

function App() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

  async function getAllSolicit() { 
    const response = await api.get<Solicitacao[]>("/solicitacao/");
        setSolicitacoes(response.data);
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
          solicitacoes && solicitacoes.filter((i) => !i.isRespondido).
          map((i) =>{
            return (
              <div key={i.idSolicitacao}>
                <SoliCard
                title="Sua solicitação" />
              </div>
            );
          })}
          {solicitacoes.length === 0 && <p>Sem solicitações disponíveis.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
