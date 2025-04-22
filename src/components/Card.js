import React, { useState } from "react";
import "./Card.css";

const Card = ({ image, flipped, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false); // Cambio de nombre para evitar conflicto

  const handleClick = () => {
    if (!isFlipped) {
      onClick();
    }
  };

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">
          <img src={image} alt="card" />
        </div>
      </div>
    </div>
  );
};

export default Card;

/*
useState se usa para comprobar que la carta está girada o no.
El estado inicial es false, lo que significa que la carta no está girada.
Cuando se hace clic en la carta, se llama a handleClick.
handleClick cambia el estado de flipped a true y llama a la función onClick pasada como prop.
Esta función onClick se encarga de la lógica de comparación de cartas.
*/