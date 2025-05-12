import React from "react";
import "./StartScreen.css";
import VolumeControl from "./VolumeControl";

// Componente de pantalla de inicio del juego
// Permite al usuario seleccionar la dificultad y la temática del juego
const StartScreen = ({ onStartGame, onSetDifficulty, onSetTheme, audio, volume, setVolume, toggleMusic, isMusicPaused }) => {
  const handleDifficultyChange = (event) => {
    onSetDifficulty(event.target.value);
  };

  const handleThemeChange = (event) => {
    onSetTheme(event.target.value);
  };

  const handleExit = () => {
    window.close(); // Cierra la ventana en navegadores compatibles
  };

  return (
    <div className="start-screen">
      <h1>Juego de Memoria</h1>
      <div className="settings">
        <label>
          Dificultad:
          <select onChange={handleDifficultyChange}>
            <option value="easy">Fácil</option>
            <option value="medium">Media</option>
            <option value="hard">Difícil</option>
          </select>
        </label>
        <label>
          Temática:
          <select onChange={handleThemeChange}>
            <option value="animals">Animales</option>
            <option value="fruits">Frutas</option>
            <option value="objects">Paisajes</option>
          </select>
        </label>
      </div>
      <button className="start-button" onClick={onStartGame}>Iniciar Juego</button>
      <div className="music-controls">
      <VolumeControl audio={audio} volume={volume} setVolume={setVolume} />
      <button className="stop-music" onClick={toggleMusic}>
        {isMusicPaused ? "Reanudar Música" : "Detener Música"}
      </button>
    </div>
      <button className="exit-app-button" onClick={handleExit}>Salir</button>
    </div>
  );
};

export default StartScreen;