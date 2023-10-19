import React from 'react';
import './styles.css';

const BikeCard = (props: { title: string, description: string, price: string, image: string }) => {
  return (
    <div className="card-bike">
      <img className="card-image" src={props.image} alt={props.title} />
      <div className="card-title">{props.title}</div>
      <div className="card-description">{props.description}</div>
      <div className="card-price">Preço: {props.price}/hora</div>
      <button className="btn-alugar">Alugar</button>
    </div>
  );
};

function App() {
  return (
    <div>
      <div className="header-container">
        <h1>Solicitações de Empréstimo de Bicicleta</h1>
      </div>

      <div className="main-container">
        <div className="bike">
          <BikeCard
            title="Bicicleta 1"
            description="Bicicleta de montanha para trilhas."
            price="$10"
            image="bike1.jpg"
          />

          <BikeCard
            title="Bicicleta 2"
            description="Bicicleta urbana para passeios na cidade."
            price="$8"
            image="bike2.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
