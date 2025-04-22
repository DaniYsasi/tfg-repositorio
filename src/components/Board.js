import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Board.css";


const images = [
  "/img1.png", "/img2.png", "/img3.png", "/img1.png", "/img2.png", "/img3.png"
];

const Board = () => {
  const [cards, setCards] = useState(images.sort(() => Math.random() - 0.5));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const handleCardClick = (index) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(index)) { //evitamos escoger una carta ya emparejada
      setSelectedCards(prev => [...prev, index]);
      //con prev usamos el valor anterior del estado para evitar problemas de asincronía
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstIndex, secondIndex] = selectedCards;
      
      // Comparamos las cartas seleccionadas
      // Si son iguales, las agregamos a matchedCards
      // Si no son iguales, las ocultamos después de un tiempo
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards(prev => [...prev, firstIndex, secondIndex]);
      }
      // Reset de las cartas seleccionadas después de un tiempo, volviendo a poder seleccionar
      setTimeout(() => {
        setSelectedCards([]);
       }, 500);
    }
  }, [selectedCards]);

  return (
    <div className="board">
      {cards.map((image, index) => (
        <Card 
          key={index} 
          image={image} 
          flipped={selectedCards.includes(index) || matchedCards.includes(index)}
          onClick={() => handleCardClick(index)} 
        />
      ))}
    </div>
  );
};

export default Board;

/*
Renderiza un grupo de cartas en el tablero del juego de memoria.
Cada carta es un componente Card que muestra una imagen.
El estado selectedCards se utiliza para almacenar las cartas seleccionadas por el jugador.
Cuando el jugador hace clic en una carta, se agrega su índice al estado selectedCards.
La función handleCardClick maneja la lógica de selección de cartas.
El componente Board utiliza un arreglo de imágenes para representar las cartas.
Cada imagen se muestra dos veces para crear pares.
El componente Card se importa y se utiliza para renderizar cada carta.
*/

/*
Baraja las cartas al azar al inicio del juego.
El estado matchedCards se utiliza para almacenar los pares de cartas que han sido emparejadas correctamente.
Cuando se seleccionan dos cartas, se comparan sus imágenes.
Si las imágenes coinciden, se agregan sus índices al estado matchedCards.
El efecto useEffect se utiliza para manejar la lógica de comparación de cartas.
Se ocultan las cartas seleccionadas después de un tiempo si no coinciden.

*/