import React from "react";
import IntroScreen from "./components/IntroScreen";
import StartScreen from "./components/StartScreen";
import Board from "./components/Board";
import "./App.css";
import VolumeControl from "./components/VolumeControl";
import introMusic from "./assets/intro-music.wav"; // Importa la música de introducción

const audio = new Audio(introMusic); // Importa la música de introducción
audio.loop = true; // Reproduce la música en bucle
audio.volume = 0.1; // Ajusta el volumen inicial

function App() {

  const [showIntro, setShowIntro] = React.useState(true);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState("easy");
  const [theme, setTheme] = React.useState("animals");
  const [volume, setVolume] = React.useState(0.1); // Estado para el volumen
  const [isMusicPaused, setIsMusicPaused] = React.useState(false); // Estado para controlar si la música está en pausa
  const [cards, setCards] = React.useState([]);
  const [time, setTime] = React.useState(0);
  const [moves, setMoves] = React.useState(0);
  const [gameOverMessage, setGameOverMessage] = React.useState("");
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);


  // Función para continuar desde la pantalla de introducción
  const handleContinue = () => {
    setShowIntro(false); 

    if (audio.paused) {
      audio.volume = volume; // Ajusta el volumen
      audio.play(); // Reproduce la música de introducción
    }
  };

  const startGame = () => {
    setGameStarted(true);
    //audio.pause(); // Detiene la música de introducción al iniciar el juego
    //audio.currentTime = 0; // Reinicia la música al principio
  };

  const toggleMusic = () => {
    if (isMusicPaused) {
      audio.play(); // Reproduce la música
      audio.volume = volume; // Ajusta el volumen
      setIsMusicPaused(false); // Actualiza el estado de pausa
    }
    else {
      audio.pause(); // Detiene la música
      setIsMusicPaused(true); // Actualiza el estado de pausa
    }
  }

  const handleCardClick = (index) => {
    // Lógica para manejar el clic en una carta
  };
  
  const resetGame = () => {
    setCards([]); // Reinicia las cartas
    setTime(0); // Reinicia el tiempo
    setMoves(0); // Reinicia los movimientos
    setGameOverMessage(""); // Limpia el mensaje de juego terminado
    setSelectedCards([]); // Limpia la selección de cartas
    setMatchedCards([]); // Limpia las parejas encontradas
  };
  

  return (
    <div>
      {showIntro ? (
        <IntroScreen onContinue={handleContinue} />
      ) : null}
      {!gameStarted ? (
        <div className ="start-screen-container">
        <StartScreen
          onStartGame={startGame}
          onSetDifficulty={setDifficulty}
          onSetTheme={setTheme}
        />
        </div>
      ) : (
        <div className="board-screen-container">
      <Board 
        difficulty={difficulty} 
        theme={theme}
        setGameStarted = {setGameStarted} 
        setDifficulty={setDifficulty}  
        setTheme={setTheme}
        cards={cards}
        time={time}
        moves={moves}
        gameOverMessage={gameOverMessage}
        selectedCards={selectedCards}
        matchedCards={matchedCards}
        handleCardClick={handleCardClick}
        resetGame={resetGame}
        audio={audio}  // Pasar el objeto de audio
        volume={volume}  // Pasar el estado de volumen
        setVolume={setVolume}  // Pasar la función para actualizar el volumen
        toggleMusic={toggleMusic}  // Pasar la función de detener/reanudar música
        isMusicPaused={isMusicPaused}  // Pasar el estado de la música
        />
      <VolumeControl
        audio={audio} // Pasa el objeto de audio al componente VolumeControl
        volume={volume} // Pasa el volumen actual al componente VolumeControl
        setVolume={setVolume} // Pasa la función para actualizar el volumen al componente VolumeControl
      />
      <button className="stop-music" onClick={toggleMusic}>
      {isMusicPaused ? "Reanudar Música" : "Detener Música"}
      </button>
      </div>
      )}
      <footer>
        <p>Juego de Memoria - React - Dani Puente</p>
      </footer>
    </div>
  );
}

export default App;