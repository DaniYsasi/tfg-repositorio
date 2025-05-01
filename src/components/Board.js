import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Board.css";
// Importamos las imágenes de los animales
import caballomar from "../assets/caballomar.png";
import delfin from "../assets/delfin.png";
import koala from "../assets/koala.png";
import oso from "../assets/oso.png";
import tigre from "../assets/tigre.png";
import tortuga from "../assets/tortuga.png";
import unicornio from "../assets/unicornio.png";
import stimpy from "../assets/stimpy.png";
import ren from "../assets/ren.png";
// Importamos las imágenes de las frutas
import cereza from "../assets/cereza.png";
import fresa from "../assets/fresa.png";
import limon from "../assets/limon.png";
import manzana from "../assets/manzana.png";
import pera from "../assets/pera.png";
import piña from "../assets/piña.png";
import platano from "../assets/platano.png";
import uva from "../assets/uva.png";
import coco from "../assets/coco.png";

// Importamos los sonidos de éxito y error
import successSound from "../assets/success-sound.wav";
import errorSound from "../assets/error-sound.wav";

//Obtemos las imágenes según el tema seleccionado
const getImagesByTheme = theme => {
  switch (theme) {
    case "animals":
      return [unicornio, caballomar, delfin, koala, stimpy, oso, tigre, tortuga, ren, unicornio, caballomar, delfin, koala, stimpy, oso, tigre, tortuga, ren];
    case "fruits":
      return [cereza, fresa, limon, manzana, pera, piña, platano, uva, coco, cereza, fresa, limon, manzana, pera, piña, platano, uva, coco];
    case "objects":
      return [unicornio, caballomar, delfin, koala, stimpy, oso, tigre, tortuga, ren, unicornio, caballomar, delfin, koala, stimpy, oso, tigre, tortuga, ren]; 
    default:
      return [unicornio, caballomar, delfin, koala, stimpy, oso, tigre, tortuga, ren, unicornio, caballomar, delfin, koala, stimpy, oso, tigre, tortuga, ren]; 
      // Por defecto, usamos animales
  }
};

// Establecer la dificultad del juego
const getNumberOfCards = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return 6; // 3 pares
    case "medium":
      return 12; // 6 pares
    case "hard":
      return 18; // 9 pares
    default:
      return 6; // Por defecto, usamos fácil
  }
};

// Componente principal del tablero del juego
const Board = ({theme, difficulty, setGameStarted, setDifficulty, setTheme}) => {
  const images = getImagesByTheme(theme); // Obtenemos las imágenes según el tema
  const numberOfCards = getNumberOfCards(difficulty); // Obtenemos el número de cartas según la dificultad
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [cards, setCards] = useState(() => {
    const selectedImages = images.slice(0, numberOfCards/2); // Selecciona las imágenes según la dificultad
    return [...selectedImages, ...selectedImages].sort(() => Math.random() - 0.5); // Devuelve solo el número de cartas según la dificultad
  });
  
  const playSuccessSound = () => {
    const audio = new Audio(successSound);
    audio.volume = 0.3; // Ajusta el volumen
    audio.play();
  }
  const playErrorSound = () => {
    const audio = new Audio(errorSound);
    audio.volume = 0.5; // Ajusta el volumen
    audio.play();
  }

  const resetGame = () => {
    const shuffledImages = [...images.slice(0, numberOfCards/2), ...images.slice(0, numberOfCards/2)].sort(() => Math.random() - 0.5); // Baraja las cartas
    setCards(shuffledImages);  // Actualiza el estado de las cartas
    setMatchedCards([]);       // Reinicia las cartas emparejadas
    setSelectedCards([]);      // Limpia las cartas seleccionadas
    setMoves(0);               // Reinicia el contador de movimientos
    setTime(0);                // Reinicia el temporizador
    setIsPlaying(false);       // Detiene el temporizador
    setGameOverMessage("");    // Limpia el mensaje de fin de juego
  };

  const handleExit = () => {
    setGameStarted(false); // Cambia el estado del juego a no iniciado
    setDifficulty("easy"); // Reinicia la dificultad a fácil
    setTheme("animals");   // Reinicia la temática a animales
  };

  console.log("Dificultad: ", difficulty);
  console.log("Temática: ", theme);
  console.log("Número de cartas: ", numberOfCards);
  console.log("Cartas: ", cards);
  console.log("Imágenes seleccionadas: ", images);
  
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
      <button className="reset-button" onClick={resetGame}>Reiniciar Juego</button>
      <button className="exit-button" onClick={handleExit}>Salir Menú Principal</button>
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