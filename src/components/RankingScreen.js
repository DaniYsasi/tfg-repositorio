import React, { useEffect, useState } from "react";
import "./RankingScreen.css";

const RankingScreen = ({ goBack }) => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const storedRanking = JSON.parse(localStorage.getItem("ranking")) || [];
    setRanking(storedRanking);
  }, []);

  return (
    <div className="ranking-screen">
      <div className="overlay">
      <h2>🏆 Ranking Top 5</h2>
      <ul>
        {ranking.length > 0 ? (
          ranking.map((score, index) => (
            <li key={index}>
              {index + 1}. {score.name} - {score.time}s, {score.moves} movimientos
            </li>
          ))
        ) : (
          <p>No hay puntuaciones guardadas aún.</p>
        )}
      </ul>
      <button onClick={goBack}>Volver</button>
    </div>
    </div>
  );
};

export default RankingScreen;
