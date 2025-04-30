import React, { useEffect } from "react";
import "./IntroScreen.css";
import clickSound from "../assets/intro-music.wav"; // Importa el sonido de clic
import  keyPressSound from "../assets/intro-music.wav"; // Importa el sonido de tecla presionada

const IntroScreen = ({ onContinue }) => {
  
  const handleInteraction = () => {
    setTimeout(() => {
      onContinue(); // Avanza a la siguiente pantalla después de 1 segundo
    }, 5); // 1 segundo
  };

  const introElement = document.querySelector(".intro-screen");
  if (introElement) {
    introElement.classList.add("fade-out"); // Agrega la clase fade-out para iniciar la animación desvanecer
  }

  useEffect(() => {
    const handleKeyPress = () => {
      handleInteraction();
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div className="intro-screen" onClick={handleInteraction}>
      <div className="overlay">
        <h1 className="game-title">Juego de Memoria</h1>
        <p className="continue-text">Pulse una tecla o haga clic para continuar</p>
      </div>
    </div>
  );
};

export default IntroScreen;