import React from "react";
import IntroScreen from "./components/IntroScreen";
import StartScreen from "./components/StartScreen";
import Board from "./components/Board";
import "./App.css";

function App() {

  const [showIntro, setShowIntro] = React.useState(true);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState("easy");
  const [theme, setTheme] = React.useState("animals");

  // Función para continuar desde la pantalla de introducción
  const handleContinue = () => {
    setShowIntro(false); 
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div>
      {showIntro ? (
        <IntroScreen onContinue={handleContinue} />
      ) : null}
      {!gameStarted ? (
        <StartScreen
          onStartGame={startGame}
          onSetDifficulty={setDifficulty}
          onSetTheme={setTheme}
        />
      ) : (
      <Board 
        difficulty={difficulty} 
        theme={theme}
        setGameStarted = {setGameStarted} 
        />
      )}
      <footer>
        <p>Juego de Memoria - React - Dani Puente</p>
      </footer>
    </div>
  );
}

export default App;