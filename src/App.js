import React from "react";
import StartScreen from "./components/StartScreen";
import Board from "./components/Board";
import "./App.css";

function App() {

  const [gameStarted, setGameStarted] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState("easy");
  const [theme, setTheme] = React.useState("animals");

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted ? (
        <StartScreen
          onStartGame={startGame}
          onSetDifficulty={setDifficulty}
          onSetTheme={setTheme}
        />
      ) : (
      <Board difficulty={difficulty} theme={theme} />
      )}
      <footer>
        <p>Juego de Memoria - React</p>
      </footer>
    </div>
  );
}

export default App;