import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Board.css";
// Importamos las imágenes de los animales
import cerdito from "../assets/cerdito.png";
import ciervo from "../assets/ciervo.png";
import erizo from "../assets/erizo.png";
// Importamos los sonidos de éxito y error
import successSound from "../assets/success-sound.wav";
import errorSound from "../assets/error-sound.wav";


const images = [
  cerdito, ciervo, erizo, cerdito, ciervo, erizo
];

const Board = () => {
  const shuffledImages = [...images].sort(() => Math.random() - 0.5);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [cards] = useState(shuffledImages); // Estado para las cartas
  const playSuccessSound = () => {
    const audio = new Audio(successSound);
    audio.play();
  }
  const playErrorSound = () => {
    const audio = new Audio(errorSound);
    audio.play();
  }
  
  const [time, setTime] = useState(0); // Temporizador del juego
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si el juego está en progreso
  const [moves, setMoves] = useState(0); // Contador de movimientos
  const [gameOverMessage, setGameOverMessage] = useState(""); // Mensaje de fin de juego

  const handleCardClick = (index) => {
    if (!isPlaying) {
      setIsPlaying(true);
      setTime(0);
    }
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
        playSuccessSound();
      }
      else {
        playErrorSound();
      }

      // Reset de las cartas seleccionadas después de un tiempo, volviendo a poder seleccionar
      setTimeout(() => {
        setSelectedCards([]);
       }, 1000);
    }

  }, [selectedCards]);

  // Incrementar tiempo cuando el juego está activo
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
      return () => clearInterval(timer);
    }, [isPlaying]);

    // Comprobar si se han emparejado todas las cartas
    // Si es así, mostrar un mensaje de victoria y detener el temporizador
    useEffect(() => {
      if (matchedCards.length === cards.length && matchedCards.length > 0) {
        setGameOverMessage("¡Felicidades! Has ganado el juego.");
        setIsPlaying(false); // Detiene el temporizador
        console.log("Has ganado el juego. Tiempo: " + time + " segundos. Movimientos: " + moves);
      }
    },[matchedCards, cards.length, time, moves, cards]);

    // Contar los movimientos del jugador
    useEffect(() => {
      if (selectedCards.length === 2) {
        setMoves(prevMoves => prevMoves + 1);
      }
    }, [selectedCards]);  

  return (
    // Mostrar tiempo y movimientos en pantalla
    <div>
      <div className="game-info">
      <p>Tiempo: {time} segundos</p>
      <p>Movimientos: {moves}</p>
      {gameOverMessage && <p className="game-over">{gameOverMessage}</p>}
      </div>

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