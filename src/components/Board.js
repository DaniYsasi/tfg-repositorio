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
// Importamos las imágenes de los paisajes
import ciudadmorada from "../assets/ciudadmorada.png";
import lunaazul from "../assets/lunaazul.png";
import ordenador from "../assets/ordenador.png";
import lunamorada from "../assets/lunamorada.png";
import labagua from "../assets/labagua.png";
import planta from "../assets/planta.png";
import lab from "../assets/lab.png";
import torres from "../assets/torres.png";
import azul from "../assets/azul.png";

// Importamos los sonidos de éxito y error
import successSound from "../assets/success-sound.wav";
import errorSound from "../assets/error-sound.wav";
import VolumeControl from "./VolumeControl";

//Obtemos las imágenes según el tema seleccionado
const getImagesByTheme = theme => {
  switch (theme) {
    case "animals":
      return [unicornio, caballomar, delfin, koala, stimpy, oso, tigre, tortuga, ren, unicornio, caballomar, delfin, koala, stimpy, oso, tigre, tortuga, ren];
    case "fruits":
      return [cereza, fresa, limon, manzana, pera, piña, platano, uva, coco, cereza, fresa, limon, manzana, pera, piña, platano, uva, coco];
    case "objects":
      return [torres, lunamorada, ciudadmorada,lunaazul, ordenador, labagua, planta, lab, azul, torres, lunamorada, ciudadmorada, lunaazul, ordenador, labagua, planta, lab, azul]; 
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
const Board = ({theme, difficulty, setGameStarted, setDifficulty, setTheme, audio, volume, setVolume, toggleMusic, isMusicPaused}) => {
  const images = getImagesByTheme(theme); // Obtenemos las imágenes según el tema
  const numberOfCards = getNumberOfCards(difficulty); // Obtenemos el número de cartas según la dificultad
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [cards, setCards] = useState(() => {
    const selectedImages = images.slice(0, numberOfCards/2); // Selecciona las imágenes según la dificultad
    return [...selectedImages, ...selectedImages].sort(() => Math.random() - 0.5); // Devuelve solo el número de cartas según la dificultad
  });

  const gridConfig = {
    easy: { columns: 3, rows: 2 },
    medium: { columns: 4, rows: 3 },
    hard: { columns: 6, rows: 3 },
  };
  const { columns, rows } = gridConfig[difficulty] || gridConfig.easy; // Configuración de la cuadrícula según la dificultad

  const boardWidth = columns * 150; // Cada carta tiene un ancho aproximado de 140px
  const boardHeight = rows * 190; // Cada carta tiene una altura aproximada de 180px
  
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
    const [saveScoreMessage, setSaveScoreMessage] = useState("");
    const [showSaveScoreOptions, setShowSaveScoreOptions] = useState(false);

    useEffect(() => {
      if (matchedCards.length === cards.length && matchedCards.length > 0) {
        setGameOverMessage("¡Felicidades! Has ganado el juego.");
        setIsPlaying(false); // Detiene el temporizador
        setSaveScoreMessage("¿Quieres guardar tu puntuación?");
        setShowSaveScoreOptions(true);
        console.log("Has ganado el juego. Tiempo: " + time + " segundos. Movimientos: " + moves);
      }
    },[matchedCards, cards.length, time, moves, cards]);

    //preguntar al jugador si quiere guardar su puntuación - introducir nombre
    const [isNamePromptVisible, setIsNamePromptVisible] = useState(false);
    const [playerName, setPlayerName] = useState("");

    const handleSaveScore = () => {
      setIsNamePromptVisible(true); // Muestra el formulario de nombre
    };
    


    // Contar los movimientos del jugador
    useEffect(() => {
      if (selectedCards.length === 2) {
        setMoves(prevMoves => prevMoves + 1);
      }
    }, [selectedCards]);  

  return (
    <div className="board-container">
      
  <div className="game-info">
    
    <p>Tiempo: {time} segundos</p>
    <p>Movimientos: {moves}</p>
    {gameOverMessage && <p className="game-over">{gameOverMessage}</p>}
    
    {/* Pregunta para guardar puntuación */}
    {/* Pregunta para guardar puntuación */}
    {showSaveScoreOptions && (
      <div className="save-score-container">
        <p className="save-score-message">{saveScoreMessage}</p>
        <button onClick={() => {
          setShowSaveScoreOptions(false); // Oculta este mensaje
          setIsNamePromptVisible(true); // Muestra el formulario de entrada
        }}>
          Guardar
        </button>
        <button onClick={() => setShowSaveScoreOptions(false)}>Cancelar</button>
      </div>
    )}

    {/* Formulario para introducir el nombre */}
    {isNamePromptVisible && (
  <div className="name-prompt-container">
    <p>Introduce tu nombre:</p>
    <input 
      type="text" 
      value={playerName} 
      onChange={(e) => setPlayerName(e.target.value)}
    />
    <button onClick={() => {
      if (playerName.trim()) { // Asegurar que no está vacío
        const newScore = { name: playerName, time, moves };
        const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
        ranking.push(newScore);
        ranking.sort((a, b) => a.time - b.time);
        localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 5)));

        setIsNamePromptVisible(false);
        setShowSaveScoreOptions(false);
      }
    }}>
      Guardar
    </button>
    <button onClick={() => setIsNamePromptVisible(false)}>Cancelar</button>
  </div>
)}

  </div>
  <div className="game">
  <div className="board" style={{
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    gap: "10px",
    justifyContent: "center",
    width: `${boardWidth}px`,
    height: `${boardHeight}px`,
  }}>
    {cards.map((image, index) => (
      <Card 
        key={index} 
        image={image} 
        flipped={selectedCards.includes(index) || matchedCards.includes(index)}
        onClick={() => handleCardClick(index)} 
      />
    ))}
  </div>
  <div className="controls-container">
    <div className="game-buttons">
      <button className="reset-button" onClick={resetGame}>Nueva Partida</button>
      <button className="exit-button" onClick={handleExit}>Menú Principal</button>
    </div>

    <div className="music-controls">
      <VolumeControl audio={audio} volume={volume} setVolume={setVolume} />
      <button className="stop-music" onClick={toggleMusic}>
        {isMusicPaused ? "Reanudar Música" : "Detener Música"}
      </button>
    </div>
  </div>
</div>
/</div>
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