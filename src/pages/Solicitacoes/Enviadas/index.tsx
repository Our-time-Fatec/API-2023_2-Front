import React from 'react';
import {useEffect, useState} from "react";
import './styles.css';
import NavBar from '../../../components/NavBar';
import api from '../../../services/api';
import Solicitacao from '../../../interfaces/Solicitacao';

const SoliCard = (props: { title: string, description: string, hora: string}) => {
  return (
    <div className="card-bike">
      <div className="card-title">{props.title}</div>
      <div className="card-description">{props.description}</div>
      <div className="card-price">Horario {props.hora}</div>
      <button className="btn-Aceitar">Aceitar</button>
      <button className="btn-Recusar">Recusar</button>
    </div>
  );
};

function App() {
  return (
    <div>
      <div className="header-container">
        <NavBar />
      </div>

      <div className="main-container">
        <div className="bike">
          <SoliCard
            title="Solicitação 1"
            description=""
            hora=""
          />

          <SoliCard
            title="Solicitação 2"
            description=""
            hora=""
          />
        </div>
      </div>
    </div>
  );
}

export default App;
